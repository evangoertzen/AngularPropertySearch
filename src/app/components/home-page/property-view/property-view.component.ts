import { Component, OnInit } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { MapService } from 'src/app/services/map-service/map.service';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';

@Component({
    selector: 'app-property-view',
    templateUrl: './property-view.component.html',
    styleUrls: ['./property-view.component.css'],
    standalone: false
})


export class PropertyViewComponent {

  highlightedProp: PropertyModel | undefined = undefined;

  constructor(
    public propertySearch: PropertySearchService,
    private mapService: MapService
  ){
    this.mapService.refreshMapHighlight$.subscribe(id => {
      console.log("Hovering over " + id);
      this.highlightedProp = this.propertySearch.getPropById(id);
    })
  }
}
