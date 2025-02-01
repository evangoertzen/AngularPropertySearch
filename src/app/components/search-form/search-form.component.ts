import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SearchFormModel } from 'src/app/models/searchForm.model';
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
    location: new FormControl('Denver', [Validators.required]),
    minPrice: new FormControl(60000, [Validators.min(0), Validators.required]),
    maxPrice: new FormControl(800000, [Validators.min(0)]),
    
    downPaymentType: new FormControl('percentage', Validators.required),
    downPaymentPercentage: new FormControl(null, [Validators.min(0), Validators.max(100)]),
    downPaymentNumber: new FormControl(null, [Validators.min(0)]),

    listingType: new FormControl(null, Validators.required)
    
  }, { validators: [downPaymentTypeRequired, greaterThanValidator] });
  
  submitted = false;
  
  selectedDownPaymentMethod = 'percentage';
  
  // house price range
  public maxCost = 1000000
  public minCost = 0

  public listingTypes = {
    'For Sale': 'FOR_SALE',
    'Sold': 'SOLD',
    'Pending': 'PENDING'
  }
  
  
  constructor(
    private propSearch: PropertySearchService
  ){}
  
  onSubmit(){

    console.log("On submit called");

    // set searchFormObj in propSearchService to the input values
    const formData: SearchFormModel = this.searchForm.value as SearchFormModel;
    this.propSearch.setSearchFormObj(formData);

    // search for properties with criteria
    const location = this.propSearch.searchFormObj?.location;
    const minPrice = this.propSearch.searchFormObj?.minPrice;
    const maxPrice = this.propSearch.searchFormObj?.maxPrice;
    const listingType = this.propSearch.searchFormObj?.listingType;

    if(location != null && minPrice != null && maxPrice != null && listingType != null){
      this.propSearch.refreshProperties(location, minPrice, maxPrice, listingType);
    }else{
      console.log("something not set");
    }
  }
}
