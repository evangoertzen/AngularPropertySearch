import { Component, Input, OnInit } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrl: './profit-loss.component.css',
  standalone: false
})
export class ProfitLossComponent implements OnInit{

  @Input()
  property: PropertyModel | null = null;

  pieChartData: any;

  constructor(){
    this.updatePieChart();
  }

  // Income
  public income = {
    rent_dol: 0
  };

  // Expenses
  public expenses = {
    vacancy_rate: 5,
    maintenance_rate: 10,
    management_fee_rate: 10,
    taxes_dol: 0,
    insurance_dol: 0,
    hoa_dol: 0,
    utilities_dol: 0,
    misc_expenses_dol: 0,
  };

  ngOnInit(): void {
    if(this.property && this.property.rent){
      this.income.rent_dol = 12 * this.property.rent;
    }

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
  calculateProfitLoss() {
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

  updatePieChart(){
    this.pieChartData = {
      labels: ['Vacancy', 'Maintenance', 'Management', 'Taxes', 'Insurance', 'HOA Fees', 'Utilities', 'Miscellaneous'],
      datasets: [
        {
          data: [this.calcVacancyExpense(), this.calcMaintenanceExpense(), this.calcManagementExpense(), this.expenses.taxes_dol, this.expenses.insurance_dol, this.expenses.hoa_dol, this.expenses.utilities_dol, this.expenses.misc_expenses_dol],
        }
      ]
    };
  }

}
