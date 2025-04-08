import { Component, Input, OnInit } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { CalculatorService } from 'src/app/services/calculator-service/calculator-service.service';
import { RentDisplayComponent } from '../shared/rent-display/rent-display.component';

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrl: './profit-loss.component.css',
  standalone: false
})
export class ProfitLossComponent implements OnInit {

  @Input()
  property: PropertyModel | null = null;

  showPieChart: boolean = true;

  pieChartData: any;
  barChartData: any;

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

  setRent(){
    if(this.property && this.property.rent){
      this.calcService.income.rent_dol = 12 * this.property.rent;
    }
  }

  setHoaFee(){
    if(this.property && this.property.hoa_fee){
      this.calcService.expenses.hoa_dol = 12 * this.property.hoa_fee;
    }
  }

  constructor(
    public calcService: CalculatorService
  ){}

  ngOnInit(): void {

    this.setRent();
    this.setHoaFee();

    if(this.property){

      if(this.property.tax){
        this.calcService.expenses.taxes_dol = this.property.tax;
      }

    }

    this.calcService.refreshMortgage$.subscribe(() => {
      this.updatePieChart();
    })

    this.updatePieChart();
  }
  
  rentChange(updatedProperty: PropertyModel): void{
    this.property = updatedProperty;
    this.setRent();
    this.updatePieChart();
  }

  // Profit/Loss Calculation
  calculateNOI() {
    const operatingIncome  = this.calcService.calculateOperatingIncome();
    const totalExpenses = this.calcService.calcTotalOperatingExpenses();

    return operatingIncome - totalExpenses;
  }

  calcCashFlow(){
    return this.calculateNOI() - this.calcService.calcCapexExpense() - this.calcService.calcMonthlyPayment()*12;
  }

  updateVal(event: number, val: any){
    val = event;
    this.updatePieChart();
  }

  updatePieChart(){
    this.calcService.profitLossSubject.next('');

    this.pieChartData = {
      labels: ['Vacancy', 'Maintenance', 'Management', 'Taxes', 'Insurance', 'HOA Fees', 'Utilities', 'Miscellaneous', 'Capital Expenses', 'Debt Service'],
      datasets: [
        {
          data: [this.calcService.calcVacancyExpense(), this.calcService.calcMaintenanceExpense(), this.calcService.calcManagementExpense(), 
            this.calcService.expenses.taxes_dol, this.calcService.expenses.insurance_dol, this.calcService.expenses.hoa_dol, 
            this.calcService.expenses.utilities_dol, this.calcService.expenses.misc_expenses_dol, this.calcService.calcCapexExpense(),
            this.calcService.calcMonthlyPayment()*12],

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
          data: [this.calcService.calcVacancyExpense()],
          backgroundColor: '#d613d6'
        },
        {
          label: 'Maintenance',
          data: [this.calcService.calcMaintenanceExpense()],
          backgroundColor: '#7513d6'
        },
        {
          label: 'Management',
          data: [this.calcService.calcManagementExpense()],
          backgroundColor: '#1a13d6'
        },
        {
          label: 'Taxes',
          data: [this.calcService.expenses.taxes_dol],
          backgroundColor: '#139cd6'
        },
        {
          label: 'Insurance',
          data: [this.calcService.expenses.insurance_dol],
          backgroundColor: '#1b9e09'
        },
        {
          label: 'HOA Fees',
          data: [this.calcService.expenses.hoa_dol],
          backgroundColor: '#7bfa0c'
        },
        {
          label: 'Utilities',
          data: [this.calcService.expenses.utilities_dol],
          backgroundColor: '#faf20c'
        },
        {
          label: 'Miscellaneous',
          data: [this.calcService.expenses.misc_expenses_dol],
          backgroundColor: '#faaf0c'
        },
        {
          label: 'Capital Expenses',
          data: [this.calcService.calcCapexExpense()],
          backgroundColor: '#fa570c'
        },
        {
          label: 'Debt Service',
          data: [this.calcService.calcMonthlyPayment() * 12],
          backgroundColor: '#d61313'
        }
      ]
    };
  }

}
