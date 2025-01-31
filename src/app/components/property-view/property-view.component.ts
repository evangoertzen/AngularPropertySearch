import { Component, OnInit } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';

@Component({
    selector: 'app-property-view',
    templateUrl: './property-view.component.html',
    styleUrls: ['./property-view.component.css'],
    standalone: false
})


export class PropertyViewComponent {
  constructor(public propertySearch: PropertySearchService){}
}
