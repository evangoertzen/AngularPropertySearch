import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  
  @Input() property!: PropertyModel;

  @Output() rentChange = new EventEmitter<PropertyModel>();
  
  rentLoading: boolean = false;
  rentErr: boolean = false;

  getRent(){

    this.rentLoading = true;
    this.rentErr = false;

    this.propertySearchService.getRent(this.property.street + ' ' + this.property.unit + ' ' + this.property.city + ' ' + this.property.state).subscribe( rent => {

      this.rentLoading = false;
      this.property.rent = rent;

      this.rentChange.emit(this.property);

    }, err => {

      this.rentLoading = false;
      this.rentErr = true;
    
    })
  }


}
