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

  updatePieChart(){
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
  }

}
