import { Component, OnInit } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';


@Component({
    selector: 'app-property-view',
    templateUrl: './property-view.component.html',
    styleUrls: ['./property-view.component.css'],
    standalone: false
})


export class PropertyViewComponent implements OnInit {

  constructor(private propertySearch: PropertySearchService){}

  properties: PropertyModel[] = [];

  ngOnInit(): void {
    this.propertySearch.getPropertyJson().subscribe( propList => {
      this.properties = propList;
      console.log(this.properties);

      console.log("Individual: ")
      this.properties.forEach((prop: any) => {
        console.log(prop)
      });
    })
  }
}
