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

  
  constructor(
    public calcService: CalculatorServiceService
  ){}


  ngOnInit() {
    if (this.property && this.property.list_price){
      this.calcService.purchasePrice = this.property.list_price;
    }
  }
}
