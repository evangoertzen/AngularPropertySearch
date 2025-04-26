import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';
import { RentDialogComponent } from './rent-dialog/rent-dialog/rent-dialog.component';

@Component({
  selector: 'app-rent-display [property]',
  templateUrl: './rent-display.component.html',
  styleUrl: './rent-display.component.css',
  standalone: false
})
export class RentDisplayComponent {

  
  constructor(
    private propertySearchService: PropertySearchService,
    private dialog: MatDialog
  ){}
  
  @Input() property!: PropertyModel;

  @Output() rentChange = new EventEmitter<PropertyModel>();
  
  rentLoading: boolean = false;
  rentErr: boolean = false;

  openRentDialog(){

    let dialogRef = this.dialog.open(RentDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {

      // Only search on continue, not on cancel
      if(result){

        if(this.propertySearchService.useAPIKey){

          this.getRent();

        }else{

          // set rent to 1 so user can edit it themselves
          this.property.monthly_rent = 1;
          this.rentChange.emit(this.property);
        }
      }
    });
  }

  getRent(){

    this.rentLoading = true;
    this.rentErr = false;

    this.propertySearchService.getRent(this.property).subscribe( rent => {

      this.rentLoading = false;
      this.property.monthly_rent = rent;

      this.rentChange.emit(this.property);

    }, err => {

      this.rentLoading = false;
      this.rentErr = true;
    
    })
  }


}
