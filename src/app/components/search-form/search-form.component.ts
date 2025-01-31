import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';


// Validator so that user enters either a percentage or a dollar amount for mortgage
function downPaymentTypeRequired(control: AbstractControl): ValidationErrors | null {
  const form = control as FormGroup;
  const type = form.get('downPaymentType')?.value;
  const percentageValue = form.get('downPaymentPercentage')?.value;
  const numberValue = form.get('downPaymentNumber')?.value;

  if (type === 'percentage' && !percentageValue) {
    return { downPaymentTypeRequired: 'Percentage is required' };
  } else if (type === 'number' && !numberValue) {
    return { downPaymentTypeRequired: 'Number is required' };
  }
  return null;
}

function greaterThanValidator(control: AbstractControl): ValidationErrors | null {
  const minValue = control.get('minPrice')?.value;
  const maxValue = control.get('maxPrice')?.value;

  if (minValue && maxValue && minValue >= maxValue) {
    return { greaterThanValidator: 'Max must be greater than or equal to min' };
  }

  return null;
}


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
  standalone: false
})
export class SearchFormComponent {
  
  
  searchForm = new FormGroup({
    location: new FormControl('Chico, CA', [Validators.required]),
    minPrice: new FormControl(60000, [Validators.min(0), Validators.required]),
    maxPrice: new FormControl(800000, [Validators.min(0)]),
    
    downPaymentType: new FormControl('percentage', Validators.required),
    downPaymentPercentage: new FormControl(null, [Validators.min(0), Validators.max(100)]),
    downPaymentNumber: new FormControl(null, [Validators.min(0)])
    
  }, { validators: [downPaymentTypeRequired, greaterThanValidator] });
  
  submitted = false;
  
  selectedDownPaymentMethod = 'percentage';
  
  // house price range
  public maxCost = 1000000
  public minCost = 0
  
  constructor(
    private propSearch: PropertySearchService
  ){}
  
  onSubmit(){

    let downPaymentDollarAmount

    const percentage = this.searchForm.get('downPaymentPercentage')?.value;
    const maxPrice = this.searchForm.get('maxPrice')?.value;

    if(this.searchForm.get('downPaymentType')?.value === 'percentage'){
      if(percentage != null && maxPrice != null){
        downPaymentDollarAmount = maxPrice * percentage / 100;
      }
    }

    // save down payment to calc?

    const location = this.searchForm.get('location')?.value;
    const minPrice = this.searchForm.get('minPrice')?.value;

    if(location != null && minPrice != null && maxPrice != null){
      this.propSearch.refreshProperties(location, minPrice, maxPrice);
    }
  }
}
