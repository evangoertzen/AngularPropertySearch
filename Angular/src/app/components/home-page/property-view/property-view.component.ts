import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild("hoveredProp") hoveredProp!: ElementRef;

  constructor(
    public propertySearch: PropertySearchService,
    private mapService: MapService
  ){
    this.mapService.refreshMapHighlight$.subscribe(id => {
      this.onHover(id);
    })
  }
  
  onHover(id: string){
    // Set property
    this.highlightedProp = this.propertySearch.getPropById(id);

    // Scroll into view
    if (this.hoveredProp) {
      this.hoveredProp.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}


