import { Component, Input } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';

@Component({
  selector: 'app-rent-display [property]',
  imports: [],
  templateUrl: './rent-display.component.html',
  styleUrl: './rent-display.component.css'
})
export class RentDisplayComponent {

  
  constructor(propertySearchService: PropertySearchService){}
  
  @Input()
  property!: PropertyModel;
  
  rentLoaded: boolean = (this.property?.rent != null);
  rentLoading: boolean = false;

  getRent(){
    this.rentLoading = true;

  }


}
