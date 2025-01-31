import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count, Observable } from 'rxjs';
import { map } from 'rxjs';
import { PropertyModel } from '../../models/property.model'

const apiUrl = 'http://localhost:8000/getProperties?location=chico&limit=100'

@Injectable({
  providedIn: 'root'
})
export class PropertySearchService {

  loadingProperties: boolean = false;
  properties: PropertyModel[] = [];

  showErr: boolean = false;

  constructor(private http: HttpClient) { }

  getPropertyJson(location: string, minPrice: number, maxPrice: number, listingType: string): Observable<PropertyModel[]>{
    return this.http.get<{ properties: PropertyModel[] }>(apiUrl, {
      params : {
        location: location,
        limit: 10,
        minPrice: minPrice,
        maxPrice: maxPrice,
        listingType: listingType
      }
    }).pipe( 
      map(response => response.properties)
    );
  }

  refreshProperties(location: string, minPrice: number, maxPrice: number, listingType: string){
    this.properties = [];
    this.loadingProperties = true;
    this.showErr = false;

    this.getPropertyJson(location, minPrice, maxPrice, listingType).subscribe( propList => {

      this.properties = propList;
      console.log(this.properties);

      this.loadingProperties = false;

    }, err => {
      this.showErr = true;
      this.loadingProperties = false;
    })
  }

}
