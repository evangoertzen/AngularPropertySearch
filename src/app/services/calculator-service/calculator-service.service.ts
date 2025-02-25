import { Injectable } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertySearchService } from '../property-search/property-search.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorServiceService {

  constructor(
    private propertySearchService: PropertySearchService
  ) { }

}
