import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CalculatorService } from '../calculator-service/calculator-service.service';

const PURCHASE_PRICE_BASE = 500000
const INTEREST_RATE_BASE = 6.7
const LOAN_TERM_BASE = 30
const DOWN_PAYMENT_PERCENTAGE_BASE = 20

const APPRECIATION_RATE_BASE = 3
const EXPENSE_INCREASE_RATE_BASE = 3
const RENT_GROWTH_RATE_BASE = 5
const CLOSING_COST_RATE_BASE = 4
const COST_TO_SELL_RATE_BASE = 5.5

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  public year = 0;

  // variables for mortgage calc
  public purchasePrice =  PURCHASE_PRICE_BASE;
  public interestRate = INTEREST_RATE_BASE;
  public loanTerm = LOAN_TERM_BASE;
  public downPaymentPercentage = DOWN_PAYMENT_PERCENTAGE_BASE;

  // variables for equity analysis
  public appreciationRate = APPRECIATION_RATE_BASE;
  public expenseIncreaseRate = EXPENSE_INCREASE_RATE_BASE;
  public rentGrowthRate = RENT_GROWTH_RATE_BASE;
  public closingCostRate = CLOSING_COST_RATE_BASE;
  public costToSellRate = COST_TO_SELL_RATE_BASE;

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

    // variables for mortgage calc
    this.purchasePrice =  PURCHASE_PRICE_BASE;
    this.interestRate = INTEREST_RATE_BASE;
    this.loanTerm = LOAN_TERM_BASE;
    this.downPaymentPercentage = DOWN_PAYMENT_PERCENTAGE_BASE;

    // variables for equity analysis
    this.appreciationRate = APPRECIATION_RATE_BASE;
    this.expenseIncreaseRate = EXPENSE_INCREASE_RATE_BASE;
    this.rentGrowthRate = RENT_GROWTH_RATE_BASE;
    this.closingCostRate = CLOSING_COST_RATE_BASE;
    this.costToSellRate = COST_TO_SELL_RATE_BASE;

  }


}
