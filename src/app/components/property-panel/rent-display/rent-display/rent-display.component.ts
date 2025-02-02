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
  
  // rentLoaded: boolean = (this.property.rent != null);
  rentLoading: boolean = false;

  getRent(){
    this.rentLoading = true;
    console.log("Getting rent");
    this.propertySearchService.getRent(this.property.street + ' ' + ' ' + this.property.unit + ' ' + this.property.city + ' ' + this.property.state).subscribe( rent => {
      this.rentLoading = false;
      this.property.rent = rent;
    }, err => {
      console.log("Couldn't get rent")
    })

  }


}
