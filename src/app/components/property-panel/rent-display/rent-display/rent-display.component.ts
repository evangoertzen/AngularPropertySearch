import { Component, Input } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';

@Component({
  selector: 'app-rent-display [property]',
  templateUrl: './rent-display.component.html',
  styleUrl: './rent-display.component.css',
  standalone: false
})
export class RentDisplayComponent {

  
  constructor(private propertySearchService: PropertySearchService){}
  
  @Input()
  property!: PropertyModel;
  
  rentLoading: boolean = false;
  rentErr: boolean = false;

  getRent(){
    this.rentLoading = true;
    this.rentErr = false;
    console.log("Getting rent");
    this.propertySearchService.getRent(this.property.street + ' ' + this.property.unit + ' ' + this.property.city + ' ' + this.property.state).subscribe( rent => {
      this.rentLoading = false;
      this.property.rent = rent;
    }, err => {
      this.rentLoading = false;
      this.rentErr = true;
      console.log("Couldn't get rent")
    })

  }


}
