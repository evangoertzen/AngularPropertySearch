import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CalculatorService } from '../calculator-service/calculator-service.service';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  public year = 0;

  // variables for mortgage calc
  public purchasePrice =  500000;
  public interestRate = 6.7;
  public loanTerm = 30;
  public downPaymentPercentage = 20;

  // variables for equity analysis
  public appreciationRate = 3;
  public expenseIncreaseRate = 3;
  public rentGrowthRate = 5;
  public closingCostRate = 4;
  public costToSellRate = 5.5;

  // Income
  public yr0_income = {
    rent_dol: 0
  };
  public yrx_income = this.yr0_income;
  
  // Expenses
  public yr0_expenses = {
    vacancy_rate: 5,
    maintenance_rate: 3,
    management_fee_rate: 10,
    taxes_dol: 0,
    insurance_dol: 0,
    hoa_dol: 0,
    utilities_dol: 0,
    misc_expenses_dol: 0,
    capex_rate: 2
  };
  // year x expenses
  public yrx_expenses = this.yr0_expenses;

  resetIncomeAndExpenses(){
    this.yrx_income = this.yr0_income;
    this.yrx_expenses = this.yr0_expenses;
  }


}
