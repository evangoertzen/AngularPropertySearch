import { Component, Input, OnInit } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { CalculatorServiceService } from 'src/app/services/calculator-service/calculator-service.service';

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrl: './profit-loss.component.css',
  standalone: false
})
export class ProfitLossComponent implements OnInit {

  @Input()
  property: PropertyModel | null = null;

  pieChartData: any;
  
  // Income
  public income = {
    rent_dol: 0
  };
  
  // Expenses
  public expenses = {
    vacancy_rate: 5,
    maintenance_rate: 3,
    management_fee_rate: 10,
    taxes_dol: 0,
    insurance_dol: 0,
    hoa_dol: 0,
    utilities_dol: 0,
    misc_expenses_dol: 0,
    capital_expenses: 0
  };

  setRent(){
    if(this.property && this.property.rent){
      this.income.rent_dol = 12 * this.property.rent;
    }
  }

  constructor(
    public calcService: CalculatorServiceService
  ){}

  ngOnInit(): void {

    this.setRent();

    if(this.property){

      if(this.property.tax){
        this.expenses.taxes_dol = this.property.tax;
      }

      if(this.property.hoa_fee){
        this.expenses.hoa_dol = this.property.hoa_fee;
      }

    }

    this.updatePieChart();
  }
  
  rentChange(updatedProperty: PropertyModel): void{
    this.property = updatedProperty;
    this.setRent();
    this.updatePieChart();
  }

  calculateOperatingIncome(){
    return this.income.rent_dol - this.calcVacancyExpense();
  }

  calcMaintenanceExpense(){
    return this.income.rent_dol * (this.expenses.maintenance_rate/100)
  }

  calcManagementExpense(){
    return this.income.rent_dol * (this.expenses.management_fee_rate/100)
  }

  calcVacancyExpense(){
    return this.income.rent_dol * (this.expenses.vacancy_rate / 100);
  }

  // Profit/Loss Calculation
  calculateNOI() {
    const operatingIncome  = this.calculateOperatingIncome();
    const totalExpenses = 
      this.calcMaintenanceExpense()
      + this.calcManagementExpense()
      + this.expenses.taxes_dol
      + this.expenses.insurance_dol
      + this.expenses.hoa_dol
      + this.expenses.utilities_dol
      + this.expenses.misc_expenses_dol;

    return operatingIncome - totalExpenses;
  }

  calcCashFlow(){
    return this.calculateNOI() - this.expenses.capital_expenses - this.calcService.calcMonthlyPayment()*12;
  }

  updatePieChart(){
    this.pieChartData = {
      labels: ['Vacancy', 'Maintenance', 'Management', 'Taxes', 'Insurance', 'HOA Fees', 'Utilities', 'Miscellaneous', 'Capital Expenses', 'Debt Service'],
      datasets: [
        {
          data: [this.calcVacancyExpense(), this.calcMaintenanceExpense(), this.calcManagementExpense(), 
            this.expenses.taxes_dol, this.expenses.insurance_dol, this.expenses.hoa_dol, 
            this.expenses.utilities_dol, this.expenses.misc_expenses_dol, this.expenses.capital_expenses,
            this.calcService.calcMonthlyPayment()*12],
        }
      ]
    };
  }

}
