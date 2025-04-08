import { Injectable } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertySearchService } from '../property-search/property-search.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public purchasePrice =  0;
  public interestRate = 6.7;
  public loanTerm = 30;
  public downPaymentPercentage = 20;

  public mortgageSubject = new Subject<string>();
  public refreshMortgage$ = this.mortgageSubject.asObservable(); //subscribe to this in P/L and update pie chart on next

  public profitLossSubject = new Subject<string>();
  public refreshProfitLoss$ = this.profitLossSubject.asObservable(); // subscribe to this in equity component and refresh graph on changes

  // Income
  public income: any;
  
  // Expenses
  public expenses: any;

  constructor(
    private propertySearchService: PropertySearchService
  ) { 
    this.resetIncomeAndExpenses();
  }

  resetIncomeAndExpenses(){
    this.expenses = {
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

    this.income = {
      rent_dol: 0
    };
  }

  calculateCompoundInterest(principal: number, rate: number, years: number, compoundsPerYear: number = 1): number {
    return principal * (1 + rate / compoundsPerYear) ** (compoundsPerYear * years);
  }

  // Mortgage calculations
  calcCashRequired(){
    return this.purchasePrice*(this.downPaymentPercentage/100);
  }

  calcDebtTotal(){
    return this.purchasePrice - this.calcCashRequired();
  }

  calcMonthlyPayment(){

    if(this.loanTerm === 0){
      return 0;
    }

    let r = (this.interestRate / 100) / 12;
    let n = 12 * this.loanTerm;

    let debtTotal = this.calcDebtTotal();

    return debtTotal * (r * ((1 + r) ** n)) / (((1 + r) ** n) - 1);
  }


  // P/L calculations
  // calc vacancy expenses in yr 0
  calcVacancyExpense(){
    return this.income.rent_dol * (this.expenses.vacancy_rate / 100);
  }

  // operating income in yr 0
  calculateOperatingIncome(){
    return this.income.rent_dol - this.calcVacancyExpense();
  }

  calcMaintenanceExpense(){
    return this.income.rent_dol * (this.expenses.maintenance_rate/100)
  }

  calcManagementExpense(){
    return this.income.rent_dol * (this.expenses.management_fee_rate/100)
  }

  calcCapexExpense(){
      return this.purchasePrice * (this.expenses.capex_rate / 100)
  }

  calcTotalOperatingExpenses(){
    return this.calcMaintenanceExpense()
    + this.calcManagementExpense()
    + this.expenses.taxes_dol
    + this.expenses.insurance_dol
    + this.expenses.hoa_dol
    + this.expenses.utilities_dol
    + this.expenses.misc_expenses_dol;
  }

}
