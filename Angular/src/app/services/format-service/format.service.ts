import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() { }

  formatWithCommas(input: number | string): string {
    const number = typeof input === 'string' ? parseFloat(input) : input;
    return number.toLocaleString();
  }

  // use to format numeric inputs
  numericValFormatted(val: number){
    return val % 1 === 0
        ? this.formatWithCommas(val.toFixed(0))
        : this.formatWithCommas(val.toFixed(2));
  }

  dollarFormatted(val: number){
    if(val < 0){
      return "-$"+this.numericValFormatted(-1*val);
    }else{
      return "$" + this.numericValFormatted(val);
    }
  }

}
