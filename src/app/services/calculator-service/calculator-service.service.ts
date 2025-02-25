import { Injectable } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertySearchService } from '../property-search/property-search.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorServiceService {

  public purchasePrice =  0;
  public interestRate = 6.7;
  public loanTerm = 30;
  public downPaymentPercentage = 20;

  constructor(
    private propertySearchService: PropertySearchService
  ) { }

  calcCashRequired(){
    return this.purchasePrice*(this.downPaymentPercentage/100);
  }

  calcMonthlyPayment(){

    if(this.loanTerm === 0){
      return 0;
    }

    let r = (this.interestRate / 100) / 12;
    let n = 12 * this.loanTerm;

    let debtTotal = 0;

    debtTotal = this.purchasePrice - this.calcCashRequired();

    return debtTotal * (r * ((1 + r) ** n)) / (((1 + r) ** n) - 1);
  }

}
