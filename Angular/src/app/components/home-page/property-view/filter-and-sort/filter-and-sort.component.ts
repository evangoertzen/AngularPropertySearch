import { Component } from '@angular/core';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';
import { MatDialog } from '@angular/material/dialog';
import { RentDialogComponent } from 'src/app/components/analysis/shared/rent-display/rent-dialog/rent-dialog/rent-dialog.component';
import { AdvancedSortDialogComponent } from './advanced-sort-dialog/advanced-sort-dialog.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-filter-and-sort',
  templateUrl: './filter-and-sort.component.html',
  styleUrl: './filter-and-sort.component.css',
  standalone: false
})
export class FilterAndSortComponent {

  public sortMethod = '';

  constructor(
    private searchService: PropertySearchService,
    private dialog: MatDialog
  ){}

  onSortChange(event: any){
    this.sortMethod=event.value;
    console.log("Sort called: " + event.value)
    if(this.sortMethod === "priceAsc"){
      this.searchService.properties.sort((a, b) => b.list_price - a.list_price);
    }else if (this.sortMethod = "priceDesc"){
      this.searchService.properties.sort((a, b) => a.list_price - b.list_price);
    }
  }

  advancedSortPopup(){
    let dialogRef = this.dialog.open(AdvancedSortDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {

      // Only search on continue, not on cancel
      if(result){

        this.searchService.loadingProperties = true;
        const requests = this.searchService.properties.map(property => this.searchService.getRent(property));

        forkJoin(requests).subscribe(results => {
          console.log('All responses:', results);
          this.searchService.loadingProperties = false;
        });


        
      }
    });
  }
}
