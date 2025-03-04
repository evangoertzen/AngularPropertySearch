import { Component, Input } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { CalculatorServiceService } from 'src/app/services/calculator-service/calculator-service.service';

@Component({
  selector: 'app-equity-analysis',
  templateUrl: './equity-analysis.component.html',
  styleUrl: './equity-analysis.component.css',
  standalone: false
})
export class EquityAnalysisComponent {
  @Input() property: PropertyModel | null = null;

  public appreciationRate = 3;
  public expenseIncreaseRate = 3;
  public rentGrowthRate = 5;
  public closingCostRate = 4;
  public costToSellRate = 5.5;

  public sellInYear = 30;

  constructor(
    public calcService: CalculatorServiceService
  ){}

  updateBarChart(){
    console.log("Updating bar chart");
  }

  // Label for year slider
  formatLabel(value: number): string {
    return `${value}`;
  }

  calcIncomeInYear(yr:number){
    // this.calcService.
  }


  calcTotalIncomeProduced(yr: number){
    return 1;
  }

  calcTotalCost(yr: number){
    return 1;
  }

  calcTotalProfit(yr:number){
    return 1;
  }

  calcROI(yr: number){

    // initial cost = down payment + closing costs
    let initialCost = this.calcService.purchasePrice*(this.calcService.downPaymentPercentage/100) + this.calcService.purchasePrice*(this.closingCostRate/100);

    // ROI = (total profit / initial expenses) * 100
    return ((this.calcTotalIncomeProduced(yr) - this.calcTotalCost(yr))/initialCost)*100;
  }

  calcIRR(yr: number){
    return 1;
  }

}
