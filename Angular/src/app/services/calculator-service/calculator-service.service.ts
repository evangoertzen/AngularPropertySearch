import { Injectable } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertySearchService } from '../property-search/property-search.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public mortgageSubject = new Subject<string>();
  public refreshMortgage$ = this.mortgageSubject.asObservable(); //subscribe to this in P/L and update pie chart on next

  public profitLossSubject = new Subject<string>();
  public refreshProfitLoss$ = this.profitLossSubject.asObservable(); // subscribe to this in equity component and refresh graph on changes

  constructor(
    private propertySearchService: PropertySearchService
  ) {}

  calculateCompoundInterest(principal: number, rate: number, years: number, compoundsPerYear: number = 1): number {
    let adjRate = rate/100;
    return principal * (1 + adjRate / compoundsPerYear) ** (compoundsPerYear * years);
  }

  // Mortgage calculations
  calcDownPayment(purchasePrice: number, downPaymentPercentage: number){
    return purchasePrice*(downPaymentPercentage/100);
  }

  calcMortgageAmount(purchasePrice: number, downPaymentPercentage: number){
    return purchasePrice - this.calcDownPayment(purchasePrice, downPaymentPercentage);
  }

   // Debt calculator
  calcRemainingLoanBalance(purchase_price: number, year: number, downPaymentPercentage:number = 20, loanTerm: number = 30, interestRate: number = 6.7){
    // B = L * ((1 + c)^n - (1 + c)^t) / ((1 + c)^n - 1), 

    let L = purchase_price - this.calcDownPayment(purchase_price, downPaymentPercentage);
    let c = interestRate/1200; //1200 because 12 months and divide by 100
    let n = 12*loanTerm;
    let t = Math.round(12*year)

    return L * (Math.pow(1 + c, n) - Math.pow(1 + c, t)) / (Math.pow(1 + c, n) - 1);
  }

  // monthly payment calc
  calcMonthlyPayment(purchasePrice: number, downPaymentPercentage: number, loanTerm: number, interestRate: number){

    if(loanTerm === 0){
      return 0;
    }

    let r = (interestRate / 100) / 12;
    let n = 12 * loanTerm;

    let debtTotal = this.calcMortgageAmount(purchasePrice, downPaymentPercentage);

    return debtTotal * (r * ((1 + r) ** n)) / (((1 + r) ** n) - 1);
  }

  calcRentInYear(year: number, yr0_rent: number, rentGrowthRate: number){
    return this.calculateCompoundInterest(yr0_rent, rentGrowthRate, year, 1);
  }
  
  calcHomeValueInYear(year: number, yr0_price: number, appreciationRate: number){
    return this.calculateCompoundInterest(yr0_price, appreciationRate, year, 1);
  }

  calcClosingCosts(purchasePrice: number, closingCostRate: number){
    return purchasePrice*(closingCostRate/100);
  }

  // P/L calculations
  calcVacancyExpenseInYear(year: number, yr0_rent: number, rentGrowthRate: number, vacancyRate: number){
    let yrx_rent = this.calcRentInYear(year, yr0_rent, rentGrowthRate);
    return yrx_rent * (vacancyRate / 100);
  }

  calcMaintenanceExpense(year: number, yr0_rent: number, rentGrowthRate: number, maintenenceRate: number){
    let yrx_rent = this.calcRentInYear(year, yr0_rent, rentGrowthRate);
    return yrx_rent * (maintenenceRate/100);
  }

  calcManagementExpense(year: number, yr0_rent: number, rentGrowthRate: number, managementFeeRate: number){
    let yrx_rent = this.calcRentInYear(year, yr0_rent, rentGrowthRate);
    return yrx_rent * (managementFeeRate/100)
  }

  calcCapexExpenseInYear(year:number, appreciationRate: number, yr0_price: number, capexRate: number){
    let yrx_homeValue = this.calcHomeValueInYear(year, yr0_price, appreciationRate);
    return yrx_homeValue * (capexRate / 100);
  }

  calcPropertyTaxesInYear(year:number, appreciationRate: number, yr0_price: number, yr0_propTaxes: number){
    let yrx_homeValue = this.calcHomeValueInYear(year, yr0_price, appreciationRate);
    let yr0_taxrate = yr0_propTaxes/yr0_price;

    return yrx_homeValue * yr0_taxrate;
  }

  calcPropertyInsuranceInYear(year:number, appreciationRate: number, yr0_price: number, yr0_insurance: number){
    let yrx_homeValue = this.calcHomeValueInYear(year, yr0_price, appreciationRate);
    let yr0_insuranceRate = yr0_insurance/yr0_price;

    return yrx_homeValue * yr0_insuranceRate;
  }

  calcHOAFeeInYear(year:number, appreciationRate: number, yr0_price: number, yr0_HOAFee: number){
    let yrx_homeValue = this.calcHomeValueInYear(year, yr0_price, appreciationRate);
    let yr0_HOARate = yr0_HOAFee/yr0_price;

    return yrx_homeValue * yr0_HOARate;
  }

  calcUtilitiesInYear(year:number, appreciationRate: number, yr0_price: number, yr0_utilities: number){
    let yrx_homeValue = this.calcHomeValueInYear(year, yr0_price, appreciationRate);
    let yr0_utilitiesRate = yr0_utilities/yr0_price;

    return yrx_homeValue * yr0_utilitiesRate;
  }

  calcMiscExpensesInYear(year:number, appreciationRate: number, yr0_price: number, yr0_miscExpenses: number){
    let yrx_homeValue = this.calcHomeValueInYear(year, yr0_price, appreciationRate);
    let yr0_miscRate = yr0_miscExpenses/yr0_price;

    return yrx_homeValue * yr0_miscRate;
  }

  calculateOperatingIncomeInYear(year:number, yr0_rent: number, rentGrowthRate:number, vacancyRate: number){
    let yrx_rent = this.calcRentInYear(year, yr0_rent, rentGrowthRate);
    return yrx_rent - this.calcVacancyExpenseInYear(year, yr0_rent, rentGrowthRate, vacancyRate);
  }

  calcTotalOperatingExpensesInYear(
    year: number,
    yr0_rent: number,
    yr0_price: number,
    rentGrowthRate: number,
    maintenenceRate: number, 
    managementFeeRate: number,
    appreciationRate: number,
    yr0_propTaxes: number,
    yr0_insurance: number,
    yr0_hoaFee: number,
    yr0_utilities: number,
    yr0_miscExpenses: number
  ){
    return this.calcMaintenanceExpense(year, yr0_rent, rentGrowthRate, maintenenceRate)
    + this.calcManagementExpense(year, yr0_rent, rentGrowthRate, managementFeeRate)
    + this.calcPropertyTaxesInYear(year, appreciationRate, yr0_price, yr0_propTaxes)
    + this.calcPropertyInsuranceInYear(year, appreciationRate, yr0_price, yr0_insurance)
    + this.calcHOAFeeInYear(year, appreciationRate, yr0_price, yr0_hoaFee)
    + this.calcUtilitiesInYear(year, appreciationRate, yr0_price, yr0_utilities)
    + this.calcMiscExpensesInYear(year, appreciationRate, yr0_price, yr0_miscExpenses)
  }

  calcCashFlowInYear(
    year: number,
    yr0_rent: number,
    yr0_price: number,
    rentGrowthRate: number,
    maintenenceRate: number, 
    managementFeeRate: number,
    appreciationRate: number,
    yr0_propTaxes: number,
    yr0_insurance: number,
    yr0_hoaFee: number,
    yr0_utilities: number,
    yr0_miscExpenses: number,
    vacancyRate: number,
    downPaymentPercentage: number,
    loanTerm: number,
    interestRate: number
  ){
    let operatingIncomeInYear = this.calculateOperatingIncomeInYear(year, yr0_rent, rentGrowthRate, vacancyRate);

    let operatingExpensesInYear = this.calcTotalOperatingExpensesInYear(
      year, yr0_rent, yr0_price, rentGrowthRate, maintenenceRate, managementFeeRate,
      appreciationRate, yr0_propTaxes, yr0_insurance, yr0_hoaFee, yr0_utilities, yr0_miscExpenses,
    )

    if(year<loanTerm){

      let mortgageExpense = this.calcMonthlyPayment(yr0_price, downPaymentPercentage, loanTerm, interestRate)*12;
      return (operatingIncomeInYear - operatingExpensesInYear) - mortgageExpense;

    }else{
      return operatingIncomeInYear - operatingExpensesInYear
    }

  }

  calcCashRequired(purchasePrice: number, downPaymentPercentage: number, closingCostRate: number){
    let downPayment = this.calcDownPayment(purchasePrice, downPaymentPercentage);
    let closingCosts = this.calcClosingCosts(purchasePrice, closingCostRate);
    return downPayment+closingCosts;
  }


}
