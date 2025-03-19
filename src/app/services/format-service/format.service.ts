import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() { }

  formatWithCommas(input: number | string): string {

    // convert to num
    const number = typeof input === 'string' ? parseFloat(input) : input;

    // add commas
    return number.toLocaleString();
  }
}
