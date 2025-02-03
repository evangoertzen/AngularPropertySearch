import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count, Observable } from 'rxjs';
import { map } from 'rxjs';
import { PropertyModel } from '../../models/property.model'
import { SearchFormModel } from 'src/app/models/searchForm.model';

const propSearchURL = 'http://localhost:8000/getProperties'
const rentCalcURL = 'http://localhost:8000/getRent'

@Injectable({
  providedIn: 'root'
})
export class PropertySearchService {

  loadingProperties: boolean = false;
  searchFinished: boolean = false;
  properties: PropertyModel[] = [];

  showErr: boolean = false;

  // object used in other services (calculator) for financials
  public searchFormObj: SearchFormModel | null = null;

  constructor(private http: HttpClient) { }

  private getPropertyJson(location: string, minPrice: number, maxPrice: number, listingType: string): Observable<PropertyModel[]>{
    return this.http.get<{ properties: PropertyModel[] }>(propSearchURL, {
      params : {
        location: location,
        limit: 10000,
        minPrice: minPrice,
        maxPrice: maxPrice,
        listingType: listingType
      }
    }).pipe( 
      map(response => response.properties)
    );
  }

  searchProperties(searchForm: SearchFormModel){

    this.searchFormObj = searchForm;

    this.properties = [];
    this.loadingProperties = true;
    this.showErr = false;
    this.searchFinished = false;

    if(searchForm.location != null && searchForm.minPrice != null && searchForm.maxPrice != null && searchForm.listingType != null){
      this.getPropertyJson(searchForm.location, searchForm.minPrice, searchForm.maxPrice, searchForm.listingType).subscribe( propList => {
  
        this.properties = propList;
        console.log(this.properties);
  
        this.loadingProperties = false;
        this.searchFinished = true;
  
      }, err => {
        this.showErr = true;
        this.loadingProperties = false;
        this.searchFinished = true;
      })
    } else {
      console.log("Can't load properties. Something not set.");
    }
  }

  getRent(address: string){
    return this.http.get<number>(rentCalcURL, {
      params : {
        address: address
      }
    })
  }

}
