import { Component, OnInit } from '@angular/core';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';

@Component({
    selector: 'app-property-view',
    templateUrl: './property-view.component.html',
    styleUrls: ['./property-view.component.css'],
    standalone: false
})


export class PropertyViewComponent implements OnInit {

  constructor(private propertySearch: PropertySearchService){}

  properties: any = [];

  ngOnInit(): void {
    this.propertySearch.getPropertyJson().subscribe( propList => {
      this.properties = propList['properties'];
      console.log(this.properties);

      console.log("Individual: ")
      this.properties.array.forEach((prop: any) => {
        console.log(prop)
      });
    })
  }
}
