import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  getPropertyJson(): Observable<PropertyModel[]>{
    return this.http.get<{ properties: PropertyModel[] }>(apiUrl).pipe( 
      map(response => response.properties)
    );
  }

  refreshProperties(){
    this.properties = [];
    this.loadingProperties = true;
    this.showErr = false;

    this.getPropertyJson().subscribe( propList => {

      this.properties = propList;
      console.log(this.properties);

      this.loadingProperties = false;

    }, err => {
      this.showErr = true;
      this.loadingProperties = false;
    })
  }

}
