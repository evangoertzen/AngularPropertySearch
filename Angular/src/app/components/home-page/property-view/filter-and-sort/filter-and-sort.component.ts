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
import { createDefaultExpenses } from 'src/app/models/expenses.model';
import { createDefaultGrowthModel } from 'src/app/models/equityGrowth.model';
import { createDefaultMortgageModel } from 'src/app/models/mortgage.model';
import { MessageService } from 'src/app/services/message-service/message-service.service';

@Component({
  selector: 'app-filter-and-sort',
  templateUrl: './filter-and-sort.component.html',
  styleUrl: './filter-and-sort.component.css',
  standalone: false
})
export class FilterAndSortComponent {

  public sortMethod = '';

  selectedTypes: Set<string> = new Set();
  selectedFilters: Set<string> = new Set();

  constructor(
    public searchService: PropertySearchService,
    private dialog: MatDialog,
    private mapService: MapService,
    private messageService: MessageService
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

  togglePropertyTypeFilter(type: string, checked: Boolean): void {
    if (checked) {
      this.selectedTypes.add(type);
    } else {
      this.selectedTypes.delete(type);
    }
    this.filter();
  }

  toggleFilter(filterName: string, checked: Boolean): void {
    console.log("toggling filter: " + filterName)
    if (checked) {
      this.selectedFilters.add(filterName);
    } else {
      this.selectedFilters.delete(filterName);
    }
    this.filter();
  }

  filter(){
    this.searchService.resetPropertyList();
    this.mapService.resetMapHighlight();

    let tempProps = this.searchService.properties;

    // apply property type filters
    if (this.selectedTypes.size > 0) {
      tempProps = tempProps.filter(p => this.selectedTypes.has(p.style));

    }

    // apply no hoa filter  
    if(this.selectedFilters.has('No-HOA')){
      tempProps = tempProps.filter(p => p.yearly_hoa_fee == 0)
    }
    
    if(tempProps.length === 0){
      this.messageService.showError("No properties match the filter(s). Showing all properties.")
      this.searchService.resetPropertyList();
    }else{
      this.searchService.properties = tempProps;
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
        const rentRequests = this.searchService.properties.map(property =>{
          if(!property.monthly_rent){

            return this.searchService.getRent(property).pipe(
              tap(rent => property.monthly_rent = rent)
            )
          }
          return null;
        }).filter(request => request !== null);

        if (rentRequests.length > 0) {
          // wait for rent requests to finish
          forkJoin(rentRequests).subscribe(results => {
            this.sortPropertiesByCashFlow();
          });
        } else {
          this.sortPropertiesByCashFlow();
        }
      }
    });
  }

  sortPropertiesByCashFlow(){
    let tupleArr: [number, PropertyModel][] = [];

    this.searchService.properties.forEach(property => {
      tupleArr.push([
        property.calcCashFlowInYear(
          0, 
          createDefaultExpenses(), 
          createDefaultGrowthModel(), 
          createDefaultMortgageModel()
        ),
        property
      ]);
    });

    tupleArr.sort((a, b) => b[0] - a[0]);
    tupleArr.forEach(tuple => {
      console.log(tuple[0]);
    });

    this.searchService.properties = tupleArr.map(([x, item]) => item);
    this.searchService.loadingProperties = false;
  }
}
