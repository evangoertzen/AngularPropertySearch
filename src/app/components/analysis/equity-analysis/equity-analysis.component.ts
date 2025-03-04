import { Component, Input, OnInit } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { CalculatorServiceService } from 'src/app/services/calculator-service/calculator-service.service';

@Component({
  selector: 'app-equity-analysis',
  templateUrl: './equity-analysis.component.html',
  styleUrl: './equity-analysis.component.css',
  standalone: false
})
export class EquityAnalysisComponent implements OnInit {
  @Input() property: PropertyModel | null = null;

  public appreciationRate = 3;
  public expenseIncreaseRate = 3;
  public rentGrowthRate = 5;
  public closingCostRate = 4;
  public costToSellRate = 5.5;

  public sellInYear = 30;

  barChartData: any;
  barChartOptions: any = {
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    }
  }

  constructor(
    public calcService: CalculatorServiceService
  ){}

  ngOnInit(){

    this.calcService.refreshMortgage$.subscribe(() => {
      this.updateBarChart();
    })

    this.updateBarChart();
  }
  
  // Label for year slider
  formatLabel(value: number): string {
    return `${value}`;
  }

  calcOperatingIncomeInYr(yr: number){
    let initialRent = this.calcService.calculateOperatingIncome();
    return this.calcService.calculateCompoundInterest(initialRent, this.rentGrowthRate/100, yr);
  }

  calcTotalExpensesInYr(yr: number){
    let initialExpenses = this.calcService.calcCapexExpense() + this.calcService.calcTotalOperatingExpenses() + (this.calcService.calcMonthlyPayment()*12);
    return this.calcService.calculateCompoundInterest(initialExpenses, this.expenseIncreaseRate/100, yr);
  }

  // get cash generated in year from rent - vacancy - other expenses - mortgage
  calcCashProfitInYear(yr:number){
    return this.calcOperatingIncomeInYr(yr) - this.calcTotalExpensesInYr(yr);
  }

  // get total cash generated from property in the past x years
  calcCashEquityInYear(yr:number){
    let total=0;
    for(let i=0; i<=yr; i++){
      total+=this.calcCashProfitInYear(i);
    }
    return total;
  }

  calcRemainingLoanBalance(yr: number){
    let loanAmount = this.calcService.calcDebtTotal();
    let monthlyRate = (this.calcService.interestRate / 100) / 12;
    let totalMonths = this.calcService.loanTerm*12;
    let monthsPaid = yr*12;

    // don't keep paying down debt after loan is free and clear
    if(monthsPaid > totalMonths){
      monthsPaid = totalMonths;
    }

    if(monthlyRate === 0){
      return loanAmount * (1-monthsPaid / totalMonths)
    }

    return loanAmount * ((1 + monthlyRate) ** totalMonths - (1 + monthlyRate) ** monthsPaid) / ((1 + monthlyRate) ** totalMonths - 1);
  }

  // get paid down debt in year
  calcPaidDownDebt(yr: number){
    return this.calcService.purchasePrice - this.calcRemainingLoanBalance(yr);
  }

  // get growth of property value
  calcPropValueGrowth(yr: number){
    return this.calcService.calculateCompoundInterest(this.calcService.purchasePrice, this.appreciationRate/100, yr) - this.calcService.purchasePrice;
  }


  calcROI(yr: number){

    // initial cost = down payment + closing costs
    let initialCost = this.calcService.purchasePrice*(this.calcService.downPaymentPercentage/100) + this.calcService.purchasePrice*(this.closingCostRate/100);

    // ROI = (total profit / initial expenses) * 100
    // return ((this.calcTotalIncomeProduced(yr) - this.calcTotalCost(yr))/initialCost)*100;
    return 1;
  }

  calcIRR(yr: number){
    return 1;
  }
  
  updateBarChart(){
    console.log("Updating bar chart");
    const xValues = Array.from({ length: this.sellInYear+1 }, (_, i) => i); // x from 0 to 30
    const cashProfit = xValues.map(x => this.calcCashEquityInYear(x).toFixed(2));
    const valueGrowth = xValues.map(x => this.calcPropValueGrowth(x).toFixed(2));
    const debtPaydown = xValues.map(x => this.calcPaidDownDebt(x).toFixed(2));

    this.barChartData = {
      labels: xValues.map(x => x.toString()), // Convert to strings for labels
      datasets: [
        { label: 'Cash Profit', data: cashProfit, backgroundColor: 'rgba(255, 99, 132)' },
        { label: 'Property Value Growth', data: valueGrowth, backgroundColor: 'rgba(54, 162, 235)' },
        { label: 'Debt Paid Down', data: debtPaydown, backgroundColor: 'rgba(255, 206, 86)' },
      ]
    };
  }
}
