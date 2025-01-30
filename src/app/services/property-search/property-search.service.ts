import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

import { PropertyModel } from '../../models/property.model'

@Injectable({
  providedIn: 'root'
})
export class PropertySearchService {

  private apiUrl = 'http://localhost:8000/getProperties?location=chico&limit=100'

  constructor(private http: HttpClient) { }

  getPropertyJson(): Observable<PropertyModel[]>{
    return this.http.get<{ properties: PropertyModel[] }>(this.apiUrl).pipe( 
      map(response => response.properties)
    );
  }


}
