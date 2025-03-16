import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SearchFormModel } from 'src/app/models/searchForm.model';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';

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
export class SearchFormComponent implements OnInit{
  
  searchForm: FormGroup;
  
  submitted = false;
  
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
  ){
    this.searchForm = new FormGroup({
      location: new FormControl('Denver', [Validators.required, Validators.minLength(3)]),
      minPrice: new FormControl(60000, [Validators.min(0), Validators.required]),
      maxPrice: new FormControl(800000, [Validators.min(0)]),
      listingType: new FormControl(null, Validators.required)
      
    }, { validators: [greaterThanValidator] });
  }

  ngOnInit(): void {

    // if form has already been submitted, use those values
    if(this.propSearch.searchFormObj){
      this.searchForm.setValue({
        location: this.propSearch.searchFormObj.location,
        minPrice: this.propSearch.searchFormObj.minPrice,
        maxPrice: this.propSearch.searchFormObj.maxPrice,
        listingType: this.propSearch.searchFormObj.listingType,
      });
    }
  }

  onSubmit(){

    if(this.searchForm.valid){
      const formData: SearchFormModel = this.searchForm.value as SearchFormModel;
      
      // set searchFormObj in propSearchService to the input values
      this.propSearch.searchProperties(formData);
    }

  }
}
