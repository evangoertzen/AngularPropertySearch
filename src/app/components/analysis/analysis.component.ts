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

  public property: PropertyModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private propertySearch: PropertySearchService,
    public calcService: CalculatorServiceService
  ){}
  
  ngOnInit(): void {
    
    this.calcService.resetIncomeAndExpenses();

    this.route.queryParamMap.subscribe(params => {
      this.mls_id = params.get('mls_id');
    });
    
    if(this.mls_id){
      const propTemp = this.propertySearch.properties.find(property => property.mls_id === this.mls_id);

      if(propTemp){
        this.property = propTemp;
      }
    }
    
    if (this.property && this.property.list_price){
      this.calcService.purchasePrice = this.property.list_price;
    }
  }
}
