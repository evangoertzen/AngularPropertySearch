import { Component, Input, OnInit } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { CalculatorServiceService } from 'src/app/services/calculator-service/calculator-service.service';

@Component({
  selector: 'app-mortgage-calc',
  templateUrl: './mortgage-calc.component.html',
  styleUrl: './mortgage-calc.component.css',
  standalone: false
})
export class MortgageCalcComponent implements OnInit{

  @Input()
  property: PropertyModel | null = null;

  public purchasePrice =  0;
  public interestRate = 6.7;
  public loanTerm = 30;
  public downPaymentPercentage = 20;
  
  constructor(
    private calcService: CalculatorServiceService
  ){}


  ngOnInit() {
    if (this.property && this.property.list_price){
      this.purchasePrice = this.property.list_price;
    }
  }

  calcCashRequired(){
    return this.purchasePrice*(this.downPaymentPercentage/100);
  }

  calcMonthlyPayment(){
    let r = (this.interestRate / 100) / 12;
    let n = 12 * this.loanTerm;

    let debtTotal = 0;

    debtTotal = this.purchasePrice - this.calcCashRequired();

    return debtTotal * (r * ((1 + r) ** n)) / (((1 + r) ** n) - 1);
  }
}
