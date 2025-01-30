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

  loadingProperties: boolean = false;
  properties: PropertyModel[] = [];

  showErr: boolean = false;

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties(){
    this.properties = [];
    this.loadingProperties = true;
    this.showErr = false;

    this.propertySearch.getPropertyJson().subscribe( propList => {

      this.properties = propList;
      console.log(this.properties);

      this.loadingProperties = false;

    }, err => {
      this.showErr = true;
      this.loadingProperties = false;
    })
  }
}
