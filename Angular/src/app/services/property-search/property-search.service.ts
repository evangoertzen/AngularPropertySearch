import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { PropertyModel } from '../../models/property.model'
import { SearchFormModel } from 'src/app/models/searchForm.model';
import * as L from 'leaflet';
import { CalculatorService } from '../calculator-service/calculator-service.service';
import { MessageService } from '../message-service/message-service.service';


const propSearchURL = 'https://capstone-api-q4ndukmdiq-uc.a.run.app/getProperties'
const rentCalcURL = 'https://capstone-api-q4ndukmdiq-uc.a.run.app/getRent'

@Injectable({
  providedIn: 'root'
})
export class PropertySearchService {

  public useAPIKey = true;
  rentAPIKey = '';

  loadingProperties: boolean = false;
  searchFinished: boolean = false;

  unfilteredProperties: PropertyModel[] = [];
  properties: PropertyModel[] = [];

  showErr: boolean = false;

  public readonly listingTypes = {
    'For sale': 'FOR_SALE',
    'Sold': 'SOLD',
    'Pending': 'PENDING',
    'Any': ''
  }

  public readonly propTypes = {
    'Single family': 'SINGLE_FAMILY',
    'Multi family':'MULTI_FAMILY',
    'Condo': 'CONDOS',
    'Townhome': 'TOWNHOMES',
    'Land': 'LAND',
    'Farm': 'FARM',
    'Mobile': 'MOBILE'
  }

  // so map component can refresh when search returns
  private refreshSubject = new Subject<void>();
  public refresh$ = this.refreshSubject.asObservable();

  public hoveringPropIdSubject = new Subject<string>();
  public refreshIcons$ = this.hoveringPropIdSubject.asObservable();

  // object used in other services (calculator) for financials
  public searchFormObj: SearchFormModel | null = null;

  public mapBounds = L.latLngBounds([{
      lat:40,
      lng:-75
  }]);

  constructor(
    private http: HttpClient,
    private calcService: CalculatorService,
    private messageService: MessageService
  ) { }

  private getPropertyJson(location: string, minPrice: number, maxPrice: number, minBeds: number, minBaths:number, listingType: string): Observable<PropertyModel[]>{
    return this.http.get<{ properties: PropertyModel[] }>(propSearchURL, {
      params : {
        location: location,
        limit: 10000,
        minPrice: minPrice,
        maxPrice: maxPrice,
        minBeds: minBeds,
        minBaths: minBaths,
        listingType: listingType
      }
    }).pipe( 
      map(response => response.properties.map(p => PropertyModel.fromJson(p, this.calcService)))
    );
  }

  updateMap(){
    this.refreshSubject.next();
  }

  resetPropertyList(){
    this.properties = this.unfilteredProperties;
    this.updateMap();
  }

  searchProperties(searchForm: SearchFormModel){

    this.searchFormObj = searchForm;

    this.properties = [];
    this.unfilteredProperties= [];
    this.loadingProperties = true;
    this.searchFinished = false;

    if(searchForm.location != null && searchForm.minPrice != null && searchForm.maxPrice != null && searchForm.listingType != null && searchForm.minBeds != null && searchForm.minBaths != null){
      this.getPropertyJson(searchForm.location, searchForm.minPrice, searchForm.maxPrice, searchForm.minBeds, searchForm.minBaths, searchForm.listingType).subscribe( propList => {
        
        if(propList.length){
          this.properties = propList;
          this.unfilteredProperties = this.properties;
          this.updateMap();
        }else{
          this.messageService.showError("No properties found.");
        }
  
        this.loadingProperties = false;
        this.searchFinished = true;

  
      }, err => {
        this.loadingProperties = false;
        this.searchFinished = true;
        this.messageService.showError("Error getting properties.");
      })
    } else {
      this.messageService.showError("Please fill out the search form.");
    }
  }

  getRent(property: PropertyModel){
    
    let address = property.street + ' ' + property.unit + ' ' + property.city + ' ' + property.state

    let homeTypeString = Object.entries(this.propTypes).find(([key, value]) => value === property.style)?.[0] || '';

    return this.http.get<number>(rentCalcURL, {
      params : {
        apiKey: this.rentAPIKey,
        address: address,
        propertyType: homeTypeString,
        bedrooms: property.beds,
        bathrooms: property.full_baths + 0.5*property.half_baths,
        squareFootage: property.sqft,
      }
    })
  }

  getPropById(mls_id: string){
    return this.properties.find(item => item.mls_id === mls_id);
  }

  countPropertiesWithoutRent(){
    let count = 0;
    this.properties.forEach(p => {
      if(!p.monthly_rent){
        count++;
      }
    })
    return count;
  }

}
