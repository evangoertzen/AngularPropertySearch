import { CalculatorService } from "../services/calculator-service/calculator-service.service";
import { TaxYrInfo } from "./taxYear.model";
import { ExpensesModel } from "./expenses.model"
import { MortgageModel } from "./mortgage.model";
import { GrowthModel } from "./equityGrowth.model";
import { Finance } from 'financejs';
import { model } from "@angular/core";

export class PropertyModel {

    private finance: Finance;

    constructor(
        private _property_url: string,
        private _property_id: string,
        private _listing_id: string,
        private _mls: string,
        private _mls_id: string,
        private _status: string,
        private _text: string,
        private _style: string,

        private _full_street_line: string,
        private _street: string,
        private _unit: string,

        private _city: string,
        private _county: string,
        private _state: string,
        private _zip_code: number,

        private _beds: number,
        private _full_baths: number,
        private _half_baths: number,
        private _sqft: number,
        private _lot_sqft: number,
        private _year_built: number,

        private _days_on_mls: number,
        private _list_price: number,
        private _list_date: Date,

        private _assessed_value: number,
        private _estimated_value: number,
        private _tax: number,
        private _tax_history: TaxYrInfo[],

        private _price_per_sqft: number,

        private _latitude: number,
        private _longitude: number,

        private _hoa_fee: number,
        private _nearby_schools: string,

        private _primary_photo: string,

        // monthlyRent
        private _rent: number,

        private calcService: CalculatorService
    ) {
        this.finance = new Finance();
    }

    static fromJson(json: any, calcService: CalculatorService): PropertyModel {
        return new PropertyModel(
          json.property_url,
          json.property_id,
          json.listing_id,
          json.mls,
          json.mls_id,
          json.status,
          json.text,
          json.style,
    
          json.full_street_line,
          json.street,
          json.unit,
    
          json.city,
          json.county,
          json.state,
          json.zip_code,
    
          json.beds,
          json.full_baths,
          json.half_baths,
          json.sqft,
          json.lot_sqft,
          json.year_built,
    
          json.days_on_mls,
          json.list_price,
          new Date(json.list_date),
    
          json.assessed_value,
          json.estimated_value,
          json.tax,
          json.tax_history, // may need mapping too
    
          json.price_per_sqft,
    
          json.latitude,
          json.longitude,
    
          json.hoa_fee,
          json.nearby_schools,
    
          json.primary_photo,
    
          json.rent,
    
          calcService
        );
      }

    get monthly_rent(): number { return this._rent; }
    set monthly_rent(val: number) { this._rent = val; }

    get yearly_rent(): number { return this._rent*12; }
    set yearly_rent(val: number) { this._rent = val/12; }

    get property_url() { return this._property_url; }
    set property_url(val: string) { this._property_url = val; }

    get property_id() { return this._property_id; }
    set property_id(val: string) { this._property_id = val; }

    get listing_id() { return this._listing_id; }
    set listing_id(val: string) { this._listing_id = val; }

    get mls() { return this._mls; }
    set mls(val: string) { this._mls = val; }

    get mls_id() { return this._mls_id; }
    set mls_id(val: string) { this._mls_id = val; }

    get status() { return this._status; }
    set status(val: string) { this._status = val; }

    get text() { return this._text; }
    set text(val: string) { this._text = val; }

    get style() { return this._style; }
    set style(val: string) { this._style = val; }

    get full_street_line() { return this._full_street_line; }
    set full_street_line(val: string) { this._full_street_line = val; }

    get street() { return this._street; }
    set street(val: string) { this._street = val; }

    get unit() { return this._unit; }
    set unit(val: string) { this._unit = val; }

    get city() { return this._city; }
    set city(val: string) { this._city = val; }

    get county() { return this._county; }
    set county(val: string) { this._county = val; }

    get state() { return this._state; }
    set state(val: string) { this._state = val; }

    get zip_code() { return this._zip_code; }
    set zip_code(val: number) { this._zip_code = val; }

    get beds() { return this._beds; }
    set beds(val: number) { this._beds = val; }

    get full_baths() { return this._full_baths; }
    set full_baths(val: number) { this._full_baths = val; }

    get half_baths() { return this._half_baths; }
    set half_baths(val: number) { this._half_baths = val; }

    get sqft() { return this._sqft; }
    set sqft(val: number) { this._sqft = val; }

    get lot_sqft() { return this._lot_sqft; }
    set lot_sqft(val: number) { this._lot_sqft = val; }

    get year_built() { return this._year_built; }
    set year_built(val: number) { this._year_built = val; }

    get days_on_mls() { return this._days_on_mls; }
    set days_on_mls(val: number) { this._days_on_mls = val; }

    get list_price() { return this._list_price; }
    set list_price(val: number) { this._list_price = val; }

    get list_date() { return this._list_date; }
    set list_date(val: Date) { this._list_date = val; }

    get assessed_value() { return this._assessed_value; }
    set assessed_value(val: number) { this._assessed_value = val; }

    get estimated_value() { return this._estimated_value; }
    set estimated_value(val: number) { this._estimated_value = val; }

    get tax() { return this._tax; }
    set tax(val: number) { this._tax = val; }

    get tax_history() { return this._tax_history; }
    set tax_history(val: TaxYrInfo[]) { this._tax_history = val; }

    get price_per_sqft() { return this._price_per_sqft; }
    set price_per_sqft(val: number) { this._price_per_sqft = val; }

    get latitude() { return this._latitude; }
    set latitude(val: number) { this._latitude = val; }

    get longitude() { return this._longitude; }
    set longitude(val: number) { this._longitude = val; }
    
    get monthly_hoa_fee() { return this._hoa_fee; }
    set monthly_hoa_fee(val: number) { this._hoa_fee = val; }

    get yearly_hoa_fee() { return this._hoa_fee*12; }
    set yearly_hoa_fee(val: number) { this._hoa_fee = val/12; }

    get nearby_schools() { return this._nearby_schools; }
    set nearby_schools(val: string) { this._nearby_schools = val; }
    
    get primary_photo() { return this._primary_photo; }
    set primary_photo(val: string) { this._primary_photo = val; }

    get purchase_price() { return this._list_price; } //assume person pays list price
    set purchase_price(val: number) { this._list_price = val; }

    public calcDownPayment(mortgage: MortgageModel){
        return this.purchase_price*(mortgage.downPaymentPercentage/100);
    }

    public calcMortgageAmount(mortgage: MortgageModel){
        return this.purchase_price - this.calcDownPayment(mortgage);
    }

    public calcRemainingLoanBalance(year: number, mortgage: MortgageModel){
        // B = L * ((1 + c)^n - (1 + c)^t) / ((1 + c)^n - 1), 
    
        if(year>=mortgage.loanTerm){
          return 0;
        }
    
        let L = this.purchase_price - this.calcDownPayment(mortgage);
        let c = mortgage.interestRate/1200; //1200 because 12 months and divide by 100
        let n = 12*mortgage.loanTerm;
        let t = Math.round(12*year)
    
        return L * (Math.pow(1 + c, n) - Math.pow(1 + c, t)) / (Math.pow(1 + c, n) - 1);
    }

    public calcMonthlyPayment(mortgage: MortgageModel){

        if(mortgage.loanTerm === 0){
          return 0;
        }
    
        let r = (mortgage.interestRate / 100) / 12;
        let n = 12 * mortgage.loanTerm;
    
        let debtTotal = this.calcMortgageAmount(mortgage);
    
        return debtTotal * (r * ((1 + r) ** n)) / (((1 + r) ** n) - 1);
    }

    public calcRentInYear(year: number, growth: GrowthModel ){
        return this.calcService.calculateCompoundInterest(this.yearly_rent, growth.rentGrowthRate, year, 1);
    }

    public calcHomeValueInYear(year: number, growth: GrowthModel){
        return this.calcService.calculateCompoundInterest(this.purchase_price, growth.appreciationRate, year, 1);
    }

    public calcClosingCosts(year: number, growth: GrowthModel){
        return this.calcHomeValueInYear(year, growth)*(growth.closingCostRate/100);
    }

    public calcVacancyExpenseInYear(year: number, growth:GrowthModel, expenses: ExpensesModel){
        let yrx_rent = this.calcRentInYear(year, growth);
        return yrx_rent * (expenses.vacancy_rate / 100);
    }

    public calcMaintenanceExpense(year: number, growth: GrowthModel, expenses: ExpensesModel){
        let yrx_rent = this.calcRentInYear(year, growth);
        return yrx_rent * (expenses.maintenance_rate/100);
    }

    public calcManagementExpense(year: number, growth: GrowthModel, expenses: ExpensesModel){
        let yrx_rent = this.calcRentInYear(year, growth);
        return yrx_rent * (expenses.management_fee_rate/100)
    }

    public calcCapexExpenseInYear(year:number, growth: GrowthModel, expenses: ExpensesModel){
        let yrx_homeValue = this.calcHomeValueInYear(year, growth);
        return yrx_homeValue * (expenses.capex_rate / 100);
    }

    public calcPropertyTaxesInYear(year:number, growth: GrowthModel){
        let yrx_homeValue = this.calcHomeValueInYear(year, growth);
        let yr0_taxrate = this.tax/this.list_price;
    
        return yrx_homeValue * yr0_taxrate;
    }

    public calcPropertyInsuranceInYear(year:number, growth: GrowthModel, expenses: ExpensesModel){
        let yrx_homeValue = this.calcHomeValueInYear(year, growth);
        let yr0_insuranceRate = expenses.insurance_dol/this.list_price;
    
        return yrx_homeValue * yr0_insuranceRate;
    }

    public calcHOAFeeInYear(year:number, growth: GrowthModel){
        let yrx_homeValue = this.calcHomeValueInYear(year, growth);
        let yr0_HOARate = this.yearly_hoa_fee/this.list_price;
    
        return yrx_homeValue * yr0_HOARate;
    }

    public calcUtilitiesInYear(year:number, growth: GrowthModel, expenses: ExpensesModel){
        let yrx_homeValue = this.calcHomeValueInYear(year, growth);
        let yr0_utilitiesRate = expenses.utilities_dol/this.list_price;
    
        return yrx_homeValue * yr0_utilitiesRate;
    }

    public calcMiscExpensesInYear(year:number, growth: GrowthModel, expenses: ExpensesModel){
        let yrx_homeValue = this.calcHomeValueInYear(year, growth);
        let yr0_miscRate = expenses.misc_expenses_dol/this.list_price;
    
        return yrx_homeValue * yr0_miscRate;
    }

    public calculateOperatingIncomeInYear(year:number, growth: GrowthModel, expenses: ExpensesModel){
        let yrx_rent = this.calcRentInYear(year, growth);
        return yrx_rent - this.calcVacancyExpenseInYear(year, growth, expenses);
    }

    public calcTotalOperatingExpensesInYear(
        year: number,
        expenses: ExpensesModel,
        growth: GrowthModel
    ){
        return this.calcMaintenanceExpense(year, growth, expenses)
        + this.calcManagementExpense(year, growth, expenses)
        + this.calcPropertyTaxesInYear(year, growth)
        + this.calcPropertyInsuranceInYear(year, growth, expenses)
        + this.calcHOAFeeInYear(year, growth)
        + this.calcUtilitiesInYear(year, growth, expenses)
        + this.calcMiscExpensesInYear(year, growth, expenses)
    }

    public calcCashFlowInYear(
        year: number,
        expenses: ExpensesModel,
        growth: GrowthModel,
        mortgage: MortgageModel
    ){
        let operatingIncomeInYear = this.calculateOperatingIncomeInYear( year, growth, expenses );
    
        let operatingExpensesInYear = this.calcTotalOperatingExpensesInYear( year, expenses, growth );

        let capex = this.calcCapexExpenseInYear( year, growth, expenses);
    
        if(year<mortgage.loanTerm){
    
          let mortgageExpense = this.calcMonthlyPayment(mortgage)*12;
          return (operatingIncomeInYear - operatingExpensesInYear) - mortgageExpense - capex;
    
        }else{
          return operatingIncomeInYear - operatingExpensesInYear - capex;
        }
    
    }

    public calcCashRequired(year: number, growth: GrowthModel, mortgage: MortgageModel){
        let downPayment = this.calcDownPayment(mortgage);
        let closingCosts = this.calcClosingCosts(year, growth);
        return downPayment+closingCosts;
    }

    public calcNetGrowthByYear(
        year: number,
        expenses: ExpensesModel,
        growth: GrowthModel,
        mortgage: MortgageModel
    ){
        
        let cashFlow = this.calcCashFlowInYear( year, expenses, growth, mortgage)
    
        let thisYearValueGrowth = 0;
        let debtPaydown = 0;
    
        if(year!=0){
          thisYearValueGrowth = this.calcHomeValueInYear(year, growth) - this.calcHomeValueInYear(year-1, growth);
          debtPaydown = this.calcRemainingLoanBalance(year, mortgage) - this.calcRemainingLoanBalance(year-1, mortgage);
        }
    
        return cashFlow + thisYearValueGrowth + debtPaydown;
    }

    public calcSellingCosts(year: number, growth: GrowthModel){
        let homeVal = this.calcHomeValueInYear(year, growth)
        return homeVal*(growth.costToSellRate/100);
    }

    calcIRR(
        year: number,
        expenses: ExpensesModel,
        growth: GrowthModel,
        mortgage: MortgageModel
    ){

        if (year <= 0 ){
          return 0;
        }
    
        let yearGrowthArr: number[] = [];
    
        for(let i=0; i<=year; i++){
          let yearCashFlow = this.calcCashFlowInYear(i, expenses, growth, mortgage)
    
          yearGrowthArr.push(yearCashFlow)
        }
    
        
        let finalHomeVal = this.calcHomeValueInYear(year, growth);
        let sellingCosts = this.calcSellingCosts(year, growth);
        let cashAfterSale = finalHomeVal-this.calcRemainingLoanBalance(year, mortgage)-sellingCosts;
        
        
        let initialCashReq = this.calcCashRequired(year, growth, mortgage)
        yearGrowthArr[year] = yearGrowthArr[year] + cashAfterSale;
    
        try{
          return this.finance.IRR(-initialCashReq, ...yearGrowthArr);
        }catch{
          return 0;
        }
    }

    calculateNOI( year: number, expenses: ExpensesModel, growth: GrowthModel ) {
        const operatingIncome = this.calculateOperatingIncomeInYear( year, growth, expenses );
        const totalExpenses = this.calcTotalOperatingExpensesInYear( year, expenses, growth );
      
        const noi = operatingIncome - totalExpenses;
        return noi;
    }

}

export function createDefaultPropertyModel(calcService: CalculatorService): PropertyModel {
    return new PropertyModel(
      "", // _property_url
      "", // _property_id
      "", // _listing_id
      "", // _mls
      "", // _mls_id
      "FOR_SALE", // _status
      "", // _text
      "", // _style
      "1234 Ivy St", // _full_street_line
      "Ivy St", // _street
      "", // _unit
      "Chico", // _city
      "Butte", // _county
      "CA", // _state
      95928,  // _zip_code
      2,  // _beds
      1,  // _full_baths
      1,  // _half_baths
      2000,  // _sqft
      5000,  // _lot_sqft
      2024,  // _year_built
      5,  // _days_on_mls
      500000,  // _list_price
      new Date(), // _list_date
      500000,  // _assessed_value
      500000,  // _estimated_value
      5000,  // _tax
      [], // _tax_history
      250,  // _price_per_sqft
      121.8375,  // _latitude
      39.7285,  // _longitude
      100,  // _hoa_fee
      "Elementary School", // _nearby_schools
      "https://www.quickenloans.com/learnassets/QuickenLoans.com/Learning%20Center%20Images/Stock-Fall-House-AdobeStock-27784382-copy.jpeg", // _primary_photo
      2500,  // _rent
      calcService // calcService
    );
}