import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyModel } from 'src/app/models/property.model';
import { CalculatorServiceService } from 'src/app/services/calculator-service/calculator-service.service';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css',
  standalone: false
})
export class AnalysisComponent implements OnInit {

  public mls_id: string | null = "";

  public property: PropertyModel | null | undefined= null;

  constructor(
    private route: ActivatedRoute,
    private propertySearch: PropertySearchService,
    public calcService: CalculatorServiceService
  ){}
  
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.mls_id = params.get('mls_id');
      console.log('mls_id: ', this.mls_id); // `id` will be `null` if not passed
    });
    
    if(this.mls_id){
      this.property = this.propertySearch.properties.find(property => property.mls_id === this.mls_id);
    }
  }
}
