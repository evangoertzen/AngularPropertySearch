import { Injectable } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertySearchService } from '../property-search/property-search.service';

const VACANCY_RATE = 0.05 // vacancy rate expressed as a ratio, ex. 0.05 = 5%
const MANAGEMENT_FEE = 0.1 // management fee as ratio of rent'
const INSURANCE_RATIO = 0.01 // this varies by location, try to find a better way to calculate
const TURNOVER_EXPENSE = 500 // how much it costs you anytime someone moves in/out
const MAINTENANCE_RATIO = .02 // cost of yearly maintenance / value of house
const UTILITIES_COST = 100 // monthly cost of utilities for property owner
const INTEREST_RATE = 0.067 // mortgage interest rate
const LOAN_TERM = 30 // loan term in years
const CAP_EX = 2000 // yearly capital expeses

@Injectable({
  providedIn: 'root'
})
export class CalculatorServiceService {

  constructor(
    private propertySearchService: PropertySearchService
  ) { }

  // market rent with no vacancy
  calcGrossPotentialRent(property: PropertyModel): number{
    return property.rent * 12;
  }

  // gross potential rent - lost rent to vacancy, aka Gross Operating Income (GOI)
  calcRentLessLoss(property: PropertyModel): number{
    return this.calcGrossPotentialRent(property) * (1 - VACANCY_RATE)
  }

  // calculate total yearly operating expenses
  calcOperatingExpenses(property: PropertyModel){

    let tax = property['tax'] // most recent year's property tax
    let insurance = property['assessed_value'] * INSURANCE_RATIO // find a better way to do this
    let management_fee = this.calcRentLessLoss(property) * MANAGEMENT_FEE
    let turnOver = TURNOVER_EXPENSE
    let maintenance = property['assessed_value'] * MAINTENANCE_RATIO
    let utilities = UTILITIES_COST * 12
  
    return tax + insurance + management_fee + turnOver + maintenance + utilities
  }



  // calculate Net Operating Income (NOI) for property. NOI = Income - expenses (not including debt)
  calcNOI(property: PropertyModel){

    let income = this.calcRentLessLoss(property)
    let expenses = this.calcOperatingExpenses(property)
  
    // print("Income: " + str(income))
    // print("Expenses: " + str(expenses))
  
    return income - expenses
  }


  // get monthly mortgage payment
  // https://i.insider.com/617ad0d246a50c0018d40b41
  calcMonthlyMortgagePayment(property: PropertyModel){
    let r = INTEREST_RATE / 12;
    let n = 12 * LOAN_TERM;

    let debtTotal = 0;
    if(this.propertySearchService.searchFormObj?.downPaymentType === 'number' && this.propertySearchService.searchFormObj?.downPaymentNumber != null){
      debtTotal = property.list_price - this.propertySearchService.searchFormObj?.downPaymentNumber;
    } else if (this.propertySearchService.searchFormObj?.downPaymentPercentage != null) { //percentage
      debtTotal = property.list_price * ((100 - this.propertySearchService.searchFormObj?.downPaymentPercentage) / 100);
    }

    return debtTotal * (r * ((1 + r) ** n)) / (((1 + r) ** n) - 1)
  }


  // calculate cash flow, NOI - debt service - capital expenses
  calcCashFlow(property: PropertyModel){
    // print("NOI: " + str(calcNOI(property)))
    // print("Yearly mortgage payment: " + str(12 * calcMonthlyMortgagePayment(property)))
    // print("Motgage payment: " + str(calcMonthlyMortgagePayment(property)))
    return this.calcNOI(property) - 12 * this.calcMonthlyMortgagePayment(property) - CAP_EX
  }
}
