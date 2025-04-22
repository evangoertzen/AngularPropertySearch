import { Component } from '@angular/core';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';
import { MatDialog } from '@angular/material/dialog';
import { RentDialogComponent } from 'src/app/components/analysis/shared/rent-display/rent-dialog/rent-dialog/rent-dialog.component';
import { AdvancedSortDialogComponent } from './advanced-sort-dialog/advanced-sort-dialog.component';
import { forkJoin, tap } from 'rxjs';
import { CalculatorService } from 'src/app/services/calculator-service/calculator-service.service';
import { PropertyModel } from 'src/app/models/property.model';
import { AnalysisService } from 'src/app/services/analysis-service/analysis.service';
import { MapService } from 'src/app/services/map-service/map.service';

@Component({
  selector: 'app-filter-and-sort',
  templateUrl: './filter-and-sort.component.html',
  styleUrl: './filter-and-sort.component.css',
  standalone: false
})
export class FilterAndSortComponent {

  public sortMethod = '';

  selectedTypes: Set<string> = new Set();

  constructor(
    public searchService: PropertySearchService,
    private dialog: MatDialog,
    private calcService: CalculatorService,
    private analysisService: AnalysisService,
    private mapService: MapService
  ){}

  setSortMethod(event: any){
    this.sortMethod=event.value;
    this.sort();
  }

  sort(){
    if(this.sortMethod === "priceAsc"){
      this.searchService.properties.sort((a, b) => b.list_price - a.list_price);
      this.mapService.resetMapHighlight();
    }else if (this.sortMethod = "priceDesc"){
      this.searchService.properties.sort((a, b) => a.list_price - b.list_price);
      this.mapService.resetMapHighlight();
    }
  }

  toggleFilter(type: string, checked: Boolean): void {
    if (checked) {
      this.selectedTypes.add(type);
    } else {
      this.selectedTypes.delete(type);
    }
    this.filter();
  }

  filter(){
    this.searchService.resetPropertyList();
    this.mapService.resetMapHighlight();

    // apply property type filters
    if (this.selectedTypes.size > 0) {
      const temp = this.searchService.properties.filter(p => this.selectedTypes.has(p.style));
      
      if(temp.length === 0){
        // send warning that nothing matches these filters
        this.searchService.resetPropertyList();
      }else{
        this.searchService.properties = temp;
      }

    }

    this.searchService.updateMap();
  }

  advancedSortPopup(){
    let dialogRef = this.dialog.open(AdvancedSortDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {

      // Only search on continue, not on cancel
      if(result){

        this.mapService.resetMapHighlight();
        this.sortMethod = '';
        this.searchService.loadingProperties = true;
        const rentRequests = this.searchService.properties.map(property =>
          this.searchService.getRent(property).pipe(
            tap(rent => property.rent = rent)
          )
        );

        forkJoin(rentRequests).subscribe(results => {
          console.log('All responses:', results);

          let tupleArr: [number, PropertyModel][] = [];

          this.searchService.properties.forEach(property => {
            console.log(property.rent +", " + property.list_price + ", " + property.tax + ", " + property.tax)
            let NOI = this.calcService.calculateNOI(
              0,
              property.rent,
              this.analysisService.rentGrowthRate,
              this.analysisService.yr0_expenses.vacancy_rate,
              property.list_price,
              this.analysisService.yr0_expenses.maintenance_rate,
              this.analysisService.yr0_expenses.management_fee_rate,
              this.analysisService.appreciationRate,
              property.tax,
              this.analysisService.yr0_expenses.insurance_dol,
              property.hoa_fee,
              this.analysisService.yr0_expenses.utilities_dol,
              this.analysisService.yr0_expenses.misc_expenses_dol);

            console.log("NOI: " + NOI);
          
            tupleArr.push([this.calcService.calcCashFlow(
              NOI,
              0,
              this.analysisService.appreciationRate,
              property.list_price,
              this.analysisService.yr0_expenses.capex_rate,
              this.analysisService.downPaymentPercentage,
              this.analysisService.loanTerm,
              this.analysisService.interestRate
            ), property ])
          })

          tupleArr.sort(((a, b) => b[0] - a[0]));
          tupleArr.forEach(tuple => {
            console.log(tuple[0]);
          })

          this.searchService.properties = tupleArr.map(([x, item]) => item);
          this.searchService.loadingProperties = false;

        });


        
      }
    });
  }
}
