import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PropertyModel } from 'src/app/models/property.model';
import { CalculatorServiceService } from 'src/app/services/calculator-service/calculator-service.service';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css',
  standalone: false
})
export class AnalysisComponent implements OnInit{

  public mls_id: string | null = "";

  public property: PropertyModel | null | undefined= null;

  public propAnalysisFields: {key: string, label: string, value: string | number | null | Date | string[] }[] = [
    { key: 'beds', label: 'Beds', value: null },
    { key: 'full_baths', label: 'Full Baths', value: null },
    { key: 'half_baths', label: 'Half Baths', value: null },
    { key: 'sqft', label: 'Square Feet', value: null },
    { key: 'lot_sqft', label: 'Lot Size (sqft)', value: null },
    { key: 'list_price', label: 'List Price ($)', value: null },
    { key: 'tax', label: 'Tax ($)', value: null },
    { key: 'hoa_fee', label: 'HOA Fee ($)', value: null },
    { key: 'rent', label: 'Rent ($)', value: null }
  ];

  constructor(
    private route: ActivatedRoute,
    private propertySearch: PropertySearchService,
    public calcService: CalculatorServiceService
  ){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.mls_id = params.get('mls_id');
      console.log('mls_id: ', this.mls_id); // `id` will be `null` if not passed
    });

    if(this.mls_id){
      this.property = this.propertySearch.properties.find(property => property.mls_id === this.mls_id);
    }

      this.populatePropAnalysisFields();
  }

  populatePropAnalysisFields(){
    this.propAnalysisFields.forEach(field => {
      if (this.property && this.property.hasOwnProperty(field.key)) {
        this.propAnalysisFields.find(field => this.property?.hasOwnProperty(field.key))
        field.value = this.property[field.key as keyof PropertyModel]
      }
    });
  }

}
