import { Component, Input, OnInit } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { CalculatorService } from 'src/app/services/calculator-service/calculator-service.service';
import { AnalysisService } from 'src/app/services/analysis-service/analysis.service';
import { ExpensesModel } from 'src/app/models/expenses.model';
import { GrowthModel } from 'src/app/models/equityGrowth.model';
import { MortgageModel } from 'src/app/models/mortgage.model';

@Component({
  selector: 'app-profit-loss [property] [expenses] [growth] [mortgage]',
  templateUrl: './profit-loss.component.html',
  styleUrl: './profit-loss.component.css',
  standalone: false
})
export class ProfitLossComponent implements OnInit {

  @Input() property!: PropertyModel;
  @Input() expenses!: ExpensesModel;
  @Input() growth!: GrowthModel;
  @Input() mortgage!: MortgageModel;

  showPieChart: boolean = true;
  
  pieChartData: any;
  barChartData: any;
  
  constructor(
    public calcService: CalculatorService,
    public analysisService: AnalysisService
  ){}

  pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right'
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            let dataset = tooltipItem.dataset.data;
            let total = dataset.reduce((acc: number, val: number) => acc + val, 0);
            let value = dataset[tooltipItem.dataIndex];
            let percentage = ((value / total) * 100).toFixed(2) + "%";
            return `${percentage}`;
          }
        }
      },
      datalabels: {
        formatter: (value: number, ctx: any) => {
          let dataset = ctx.chart.data.datasets[0].data;
          let total = dataset.reduce((acc: number, val: number) => acc + val, 0);
          let percentage = ((value / total) * 100).toFixed(2) + "%";
          return percentage;
        },
        color: "white",
        anchor: "end",
        align: "start"
      }
    }
  };

  barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right'
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            let value = tooltipItem.raw;
            return `$${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: { 
        stacked: false,
        ticks: {
          display: false,
        },
      },
      y: { beginAtZero: true }
    }
  };

  ngOnInit(): void {

    // update when mortgage changes
    this.calcService.refreshMortgage$.subscribe(() => {
      this.updatePieChart();
    })

    // update once on init
    this.updatePieChart();
  }
  
  rentChangeFromAPI(updatedProperty: PropertyModel): void{
    this.updateRent(updatedProperty.monthly_rent);
  }

  updateRent(event: number){
    this.property.monthly_rent = event;
    this.updatePieChart();
  }

  // Profit/Loss Calculation
  calculateNOI() {
    return this.property.calculateNOI(
      this.analysisService.year,
      this.expenses,
      this.growth
    );
  }

  calcCashFlow(){

    return this.property.calcCashFlowInYear(
      0,
      this.expenses,
      this.growth,
      this.mortgage
    )
  }

  updateVal(event: number, val: any){
    val = event;
    this.updatePieChart();
  }

  updatePieChart(){

    let year = this.analysisService.year;

    this.calcService.profitLossSubject.next('');

    this.pieChartData = {
      labels: ['Vacancy', 'Maintenance', 'Management', 'Taxes', 'Insurance', 'HOA Fees', 'Utilities', 'Miscellaneous', 'Capital Expenses', 'Debt Service'],
      datasets: [
        {
          data: [
            this.property.calcVacancyExpenseInYear(year, this.growth, this.expenses),
            this.property.calcMaintenanceExpense(year, this.growth, this.expenses),
            this.property.calcManagementExpense(year, this.growth, this.expenses),
            this.property.calcPropertyTaxesInYear(year, this.growth),
            this.property.calcPropertyInsuranceInYear(year, this.growth, this.expenses),
            this.property.calcHOAFeeInYear(year, this.growth),
            this.property.calcUtilitiesInYear(year, this.growth, this.expenses),
            this.property.calcMiscExpensesInYear(year, this.growth, this.expenses),
            this.property.calcCapexExpenseInYear(year, this.growth, this.expenses),
            this.property.calcMonthlyPayment(this.mortgage)*12],

          backgroundColor: [
            '#d613d6', // Vacancy
            '#7513d6', // Maintenance
            '#1a13d6', // Management
            '#139cd6', // Taxes
            '#1b9e09', // Insurance
            '#7bfa0c', // HOA Fees
            '#faf20c', // Utilities
            '#faaf0c', // Miscellaneous
            '#fa570c', // Capital Expenses
            '#d61313'  // Debt Service
          ]
        }
      ]
    };

    this.barChartData = {
      labels: ['Expenses'],
      datasets: [
        {
          label: 'Vacancy',
          data: [this.property.calcVacancyExpenseInYear(year, this.growth, this.expenses),],
          backgroundColor: '#d613d6'
        },
        {
          label: 'Maintenance',
          data: [this.property.calcMaintenanceExpense(year, this.growth, this.expenses),],
          backgroundColor: '#7513d6'
        },
        {
          label: 'Management',
          data: [this.property.calcManagementExpense(year, this.growth, this.expenses),],
          backgroundColor: '#1a13d6'
        },
        {
          label: 'Taxes',
          data: [this.property.calcPropertyTaxesInYear(year, this.growth),],
          backgroundColor: '#139cd6'
        },
        {
          label: 'Insurance',
          data: [this.property.calcPropertyInsuranceInYear(year, this.growth, this.expenses),],
          backgroundColor: '#1b9e09'
        },
        {
          label: 'HOA Fees',
          data: [this.property.calcHOAFeeInYear(year, this.growth),],
          backgroundColor: '#7bfa0c'
        },
        {
          label: 'Utilities',
          data: [this.property.calcUtilitiesInYear(year, this.growth, this.expenses),],
          backgroundColor: '#faf20c'
        },
        {
          label: 'Miscellaneous',
          data: [this.property.calcMiscExpensesInYear(year, this.growth, this.expenses),],
          backgroundColor: '#faaf0c'
        },
        {
          label: 'Capital Expenses',
          data: [this.property.calcCapexExpenseInYear(year, this.growth, this.expenses),],
          backgroundColor: '#fa570c'
        },
        {
          label: 'Debt Service',
          data: [this.property.calcMonthlyPayment(this.mortgage)*12],
          backgroundColor: '#d61313'
        }
      ]
    };
  }

}
