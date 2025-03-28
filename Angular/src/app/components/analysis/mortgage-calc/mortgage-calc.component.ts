import { Component, Input } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { CalculatorServiceService } from 'src/app/services/calculator-service/calculator-service.service';

@Component({
  selector: 'app-mortgage-calc',
  templateUrl: './mortgage-calc.component.html',
  styleUrl: './mortgage-calc.component.css',
  standalone: false
})
export class MortgageCalcComponent {

  @Input()
  property: PropertyModel | null = null;

  
  constructor(
    public calcService: CalculatorServiceService
  ){}

  updatePieChart(){
    this.calcService.mortgageSubject.next('');
  }
}
