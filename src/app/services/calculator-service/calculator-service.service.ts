import { Injectable } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertySearchService } from '../property-search/property-search.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorServiceService {

  public purchasePrice =  0;
  public interestRate = 6.7;
  public loanTerm = 30;
  public downPaymentPercentage = 20;

  public mortgageSubject = new Subject<string>();
  public refreshMortgage$ = this.mortgageSubject.asObservable(); //subscribe to this in P/L and update pie chart on next

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
