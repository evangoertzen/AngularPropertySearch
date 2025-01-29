import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertySearchService {

  private apiUrl = 'http://localhost:8000/getProperties?location=chico&limit=100'

  constructor(private http: HttpClient) { }

  getPropertyJson(): Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }


}
