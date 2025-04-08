import { Component, Input } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { AnalysisService } from 'src/app/services/analysis-service/analysis.service';
import { CalculatorService } from 'src/app/services/calculator-service/calculator-service.service';

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
    public calcService: CalculatorService,
    public analysisService: AnalysisService
  ){}

  updatePieChart(){
    this.calcService.mortgageSubject.next('');
  }
}
