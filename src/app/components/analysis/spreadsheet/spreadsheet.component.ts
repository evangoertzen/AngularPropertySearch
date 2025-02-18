import { Component } from '@angular/core';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrl: './spreadsheet.component.css',
  standalone: false
})
export class SpreadsheetComponent {

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

  // Profit/Loss Calculation
  calculateProfitLoss() {
    const totalIncome = this.income.rent_dol;
    const totalExpenses = 
      this.income.rent_dol * (this.expenses.vacancy_rate/100)
      + this.income.rent_dol * (this.expenses.maintenance_rate/100)
      + this.income.rent_dol * (this.expenses.management_fee_rate/100)
      + this.expenses.taxes_dol
      + this.expenses.insurance_dol
      + this.expenses.hoa_dol
      + this.expenses.utilities_dol
      + this.expenses.misc_expenses_dol;

    return totalIncome - totalExpenses;
  }

}
