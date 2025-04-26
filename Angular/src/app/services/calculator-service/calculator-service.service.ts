import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public mortgageSubject = new Subject<string>();
  public refreshMortgage$ = this.mortgageSubject.asObservable(); //subscribe to this in P/L and update pie chart on next

  public profitLossSubject = new Subject<string>();
  public refreshProfitLoss$ = this.profitLossSubject.asObservable(); // subscribe to this in equity component and refresh graph on changes


  constructor() {}

  // for 7% growth, pass 7 for rate
  public calculateCompoundInterest(principal: number, rate: number, years: number, compoundsPerYear: number = 1): number {
    let adjRate = rate/100;
    return principal * (1 + adjRate / compoundsPerYear) ** (compoundsPerYear * years);
  }

}
