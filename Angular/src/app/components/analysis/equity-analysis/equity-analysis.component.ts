import { Component, Input, OnInit } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { AnalysisService } from 'src/app/services/analysis-service/analysis.service';
import { CalculatorService } from 'src/app/services/calculator-service/calculator-service.service';

@Component({
  selector: 'app-equity-analysis',
  templateUrl: './equity-analysis.component.html',
  styleUrl: './equity-analysis.component.css',
  standalone: false
})
export class EquityAnalysisComponent implements OnInit {
  @Input() property: PropertyModel | null = null;

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
    let operatingExpenses = this.calcService.calcTotalOperatingExpensesInYear(
      this.analysisService.year,
      this.analysisService.yr0_income.rent_dol,
      this.analysisService.purchasePrice,
      this.analysisService.rentGrowthRate,
      this.analysisService.yr0_expenses.maintenance_rate,
      this.analysisService.yr0_expenses.management_fee_rate,
      this.analysisService.appreciationRate,
      this.analysisService.yr0_expenses.taxes_dol,
      this.analysisService.yr0_expenses.insurance_dol,
      this.analysisService.yr0_expenses.hoa_dol,
      this.analysisService.yr0_expenses.utilities_dol,
      this.analysisService.yr0_expenses.misc_expenses_dol
    );

    // include mortgage only if not paid off
    if(yr<this.analysisService.loanTerm){
      let mortgageExpense = this.calcService.calcMonthlyPayment(
        this.analysisService.purchasePrice,
        this.analysisService.downPaymentPercentage,
        this.analysisService.loanTerm,
        this.analysisService.interestRate)*12;

      return operatingExpenses+mortgageExpense;
    }

    // if not still paying mortgage, return only NOE
    return operatingExpenses;
  }

  // get cash generated in year from rent - vacancy - other expenses - mortgage
  calcCashProfitInYear(yr:number){
    return this.calcService.calcCashFlowInYear(
      yr,
      this.analysisService.yr0_income.rent_dol,
      this.analysisService.purchasePrice,
      this.analysisService.rentGrowthRate,
      this.analysisService.yr0_expenses.maintenance_rate,
      this.analysisService.yr0_expenses.management_fee_rate,
      this.analysisService.appreciationRate,
      this.analysisService.yr0_expenses.taxes_dol,
      this.analysisService.yr0_expenses.insurance_dol,
      this.analysisService.yr0_expenses.hoa_dol,
      this.analysisService.yr0_expenses.utilities_dol,
      this.analysisService.yr0_expenses.misc_expenses_dol,
      this.analysisService.yr0_expenses.vacancy_rate,
      this.analysisService.downPaymentPercentage,
      this.analysisService.loanTerm,
      this.analysisService.interestRate
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
    let ogLoanAmount = this.calcService.calcMortgageAmount(this.analysisService.purchasePrice, this.analysisService.downPaymentPercentage) ;
    
    let loanLeft = this.calcService.calcRemainingLoanBalance(
      this.analysisService.purchasePrice,
      yr,
      this.analysisService.downPaymentPercentage,
      this.analysisService.loanTerm,
      this.analysisService.interestRate
    );

    return ogLoanAmount - loanLeft;
  }

  calcDownPayment(){
    return this.calcService.calcDownPayment(
      this.analysisService.purchasePrice,
      this.analysisService.downPaymentPercentage
    )
  }

  // get growth of property value
  calcPropValueGrowth(yr: number){
    let curVal = this.calcService.calcHomeValueInYear(
      yr,
      this.analysisService.purchasePrice,
      this.analysisService.appreciationRate,
    )

    return curVal - this.analysisService.purchasePrice;
  }

  calcTotalEquity(yr: number){
    return this.calcService.calcDownPayment(this.analysisService.purchasePrice, this.analysisService.downPaymentPercentage) 
    + this.calcPaidDownDebt(yr) 
    + this.calcPropValueGrowth(yr)
    + this.calcCashEquityInYear(yr);
  }

  calcInitialCost(){
    return this.calcService.calcCashRequired(this.analysisService.purchasePrice, this.analysisService.downPaymentPercentage, this.analysisService.closingCostRate);
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
    return this.calcService.calcIRR(
      yr,
      this.analysisService.yr0_income.rent_dol,
      this.analysisService.purchasePrice,
      this.analysisService.rentGrowthRate,
      this.analysisService.yr0_expenses.maintenance_rate,
      this.analysisService.yr0_expenses.management_fee_rate,
      this.analysisService.appreciationRate,
      this.analysisService.yr0_expenses.taxes_dol,
      this.analysisService.yr0_expenses.insurance_dol,
      this.analysisService.yr0_expenses.hoa_dol,
      this.analysisService.yr0_expenses.utilities_dol,
      this.analysisService.yr0_expenses.misc_expenses_dol,
      this.analysisService.yr0_expenses.vacancy_rate,
      this.analysisService.downPaymentPercentage,
      this.analysisService.loanTerm,
      this.analysisService.interestRate,
      this.analysisService.closingCostRate,
      this.analysisService.costToSellRate
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
