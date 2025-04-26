import { Component, Input, OnInit } from '@angular/core';
import { GrowthModel } from 'src/app/models/equityGrowth.model';
import { ExpensesModel } from 'src/app/models/expenses.model';
import { MortgageModel } from 'src/app/models/mortgage.model';
import { PropertyModel } from 'src/app/models/property.model';
import { AnalysisService } from 'src/app/services/analysis-service/analysis.service';
import { CalculatorService } from 'src/app/services/calculator-service/calculator-service.service';

@Component({
  selector: 'app-equity-analysis [property] [expenses] [mortgage] [growth]',
  templateUrl: './equity-analysis.component.html',
  styleUrl: './equity-analysis.component.css',
  standalone: false
})
export class EquityAnalysisComponent implements OnInit {

  @Input() property!: PropertyModel;
  @Input() expenses!: ExpensesModel;
  @Input() mortgage!: MortgageModel;
  @Input() growth!: GrowthModel;

  public sellInYear = 30;

  barChartData: any;
  barChartOptions: any = {
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            let value = Number(tooltipItem.raw);
            return `$${value.toLocaleString()}`;
          }
        }
      }
    },
  }

  constructor(
    public calcService: CalculatorService,
    public analysisService: AnalysisService
  ){}

  ngOnInit(){

    this.calcService.refreshMortgage$.subscribe(() => {
      this.updateBarChart();
    })

    this.calcService.refreshProfitLoss$.subscribe(() => {
      this.updateBarChart();
    })

    this.updateBarChart();
  }
  
  // Label for year slider
  formatLabel(value: number): string {
    return `${value}`;
  }

  calcTotalExpensesInYr(yr: number){
    let operatingExpenses = this.property.calcTotalOperatingExpensesInYear(
      this.analysisService.year,
      this.expenses,
      this.growth
    );

    let mortgageExpense = 0;
    // include mortgage only if not paid off
    if(yr<this.mortgage.loanTerm){
      mortgageExpense = this.property.calcMonthlyPayment(this.mortgage)*12;
    }

    let capex = this.property.calcCapexExpenseInYear(this.analysisService.year, this.growth, this.expenses);

    // if not still paying mortgage, return only NOE
    return operatingExpenses + mortgageExpense + capex;
  }

  // get cash generated in year from rent - vacancy - other expenses - mortgage
  calcCashProfitInYear(yr:number){
    return this.property.calcCashFlowInYear(
      yr,
      this.expenses,
      this.growth,
      this.mortgage
    )
  }

  // get total cash generated from property in the past x years
  calcCashEquityInYear(yr:number){
    let total=0;
    for(let i=0; i<=yr; i++){
      total+=this.calcCashProfitInYear(i);
    }

    return total;
  }

  // get paid down debt in year
  calcPaidDownDebt(yr: number){
    let ogLoanAmount = this.property.calcMortgageAmount(this.mortgage);
    
    let loanLeft = this.property.calcRemainingLoanBalance( yr, this.mortgage );

    return ogLoanAmount - loanLeft;
  }

  calcDownPayment(){
    return this.property.calcDownPayment( this.mortgage )
  }

  // get growth of property value
  calcPropValueGrowth(yr: number){
    let curVal = this.property.calcHomeValueInYear( yr, this.growth )

    return curVal - this.property.purchase_price;
  }

  calcTotalEquity(yr: number){
    return this.property.calcDownPayment(this.mortgage)
  }

  calcInitialCost(){
    return this.property.calcCashRequired(0, this.growth, this.mortgage);
  }

  calcCreatedEquity(yr: number){
    let initialCost = this.calcInitialCost();
    return this.calcTotalEquity(yr) - initialCost;
  }


  calcROI(yr: number){

    // initial cost = down payment + closing costs
    let initialCost = this.calcInitialCost();

    // ROI = (total profit / initial expenses) * 100
    return ((this.calcTotalEquity(yr) - initialCost)/initialCost)*100;
  }

  calcIRR(yr: number){
    return this.property.calcIRR(
      yr,
      this.expenses,
      this.growth,
      this.mortgage
    )

  }
  
  updateBarChart(){
    console.log("Updating bar chart");
    const xValues = Array.from({ length: this.sellInYear+1 }, (_, i) => i); // x from 0 to 30
    const cashProfit = xValues.map(x => this.calcCashEquityInYear(x).toFixed(2));
    const valueGrowth = xValues.map(x => this.calcPropValueGrowth(x).toFixed(2));
    const debtPaydown = xValues.map(x => this.calcPaidDownDebt(x).toFixed(2));
    const downPayment = xValues.map(x => this.calcDownPayment().toFixed(2));

    this.barChartData = {
      labels: xValues.map(x => x.toString()), // Convert to strings for labels
      datasets: [
        { label: 'Cumulative Cash Flow', data: cashProfit, backgroundColor: 'rgba(255, 0, 0, 1)' },
        { label: 'Property Value Growth', data: valueGrowth, backgroundColor: 'rgba(0, 0, 255, 1)' },
        { label: 'Mortgage Paydown', data: debtPaydown, backgroundColor: 'rgba(0, 128, 0, 1)' },
        { label: 'Downpayment', data: downPayment, backgroundColor: 'rgba(255, 255, 0, 1)' },
      ]
    };
  }
}
