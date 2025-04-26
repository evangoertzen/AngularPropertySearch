import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpensesModel } from 'src/app/models/expenses.model';
import { PropertyModel } from 'src/app/models/property.model';
import { CalculatorService } from 'src/app/services/calculator-service/calculator-service.service';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';
import { createDefaultExpenses } from 'src/app/models/expenses.model';
import { createDefaultPropertyModel } from 'src/app/models/property.model';
import { createDefaultMortgageModel, MortgageModel } from 'src/app/models/mortgage.model';
import { createDefaultGrowthModel, GrowthModel } from 'src/app/models/equityGrowth.model';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css',
  standalone: false
})
export class AnalysisComponent implements OnInit {

  public mls_id: string | null = "";

  public property: PropertyModel;
  public expenses: ExpensesModel = createDefaultExpenses();
  public mortgage: MortgageModel = createDefaultMortgageModel();
  public growth: GrowthModel = createDefaultGrowthModel();

  constructor(
    private route: ActivatedRoute,
    private propertySearch: PropertySearchService,
    public calcService: CalculatorService
  ){
    this.property = createDefaultPropertyModel(calcService);
  }
  
  ngOnInit(): void {
    
    this.resetIncomeAndExpenses();

    this.route.queryParamMap.subscribe(params => {
      this.mls_id = params.get('mls_id');
    });
    
    if(this.mls_id){
      const propTemp = this.propertySearch.properties.find(property => property.mls_id === this.mls_id);

      if(propTemp){
        this.property = propTemp;
      }
    }
  }

  resetIncomeAndExpenses(){
    this.expenses = createDefaultExpenses();
    this.mortgage = createDefaultMortgageModel();
    this.growth = createDefaultGrowthModel();
  }
}
