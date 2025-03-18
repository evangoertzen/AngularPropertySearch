import { Component, Input, OnInit } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { CalculatorServiceService } from 'src/app/services/calculator-service/calculator-service.service';
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
        position: 'right',
      },
    },
  };

  barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right'
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
    public calcService: CalculatorServiceService
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
        }
      ]
    };

    this.barChartData = {
      labels: ['none'],
      datasets: [
        {
          label: 'Vacancy',
          data: [this.calcService.calcVacancyExpense()],
          backgroundColor: '#FF6384'
        },
        {
          label: 'Maintenance',
          data: [this.calcService.calcMaintenanceExpense()],
          backgroundColor: '#36A2EB'
        },
        {
          label: 'Management',
          data: [this.calcService.calcManagementExpense()],
          backgroundColor: '#FFCE56'
        },
        {
          label: 'Taxes',
          data: [this.calcService.expenses.taxes_dol],
          backgroundColor: '#4BC0C0'
        },
        {
          label: 'Insurance',
          data: [this.calcService.expenses.insurance_dol],
          backgroundColor: '#9966FF'
        },
        {
          label: 'HOA Fees',
          data: [this.calcService.expenses.hoa_dol],
          backgroundColor: '#FF9F40'
        },
        {
          label: 'Utilities',
          data: [this.calcService.expenses.utilities_dol],
          backgroundColor: '#FFCD56'
        },
        {
          label: 'Miscellaneous',
          data: [this.calcService.expenses.misc_expenses_dol],
          backgroundColor: '#C9CBCF'
        },
        {
          label: 'Capital Expenses',
          data: [this.calcService.calcCapexExpense()],
          backgroundColor: '#B5E48C'
        },
        {
          label: 'Debt Service',
          data: [this.calcService.calcMonthlyPayment() * 12],
          backgroundColor: '#A63D40'
        }
      ]
    };
    
  }

}
