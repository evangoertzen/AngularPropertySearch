import { Component, Input, OnInit } from '@angular/core';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';

@Component({
  selector: 'app-home-type-and-status',
  templateUrl: './home-type-and-status.component.html',
  styleUrl: './home-type-and-status.component.css',
  standalone: false
})
export class HomeTypeAndStatusComponent implements OnInit{

  @Input() homeType: string = '';
  homeTypeDisplayString = '';

  @Input() saleStatus: string = '';
  saleStatusDisplayString = '';

  protected circleColor = 'rgb(189, 189, 189)';

  constructor(private searchService: PropertySearchService){}

  // red, blue, green, etc for status of sale.

  ngOnInit(): void {

    // Set sale status and circle color
    if(this.saleStatus === this.searchService.listingTypes['For sale']){

      this.saleStatusDisplayString = 'for sale'
      this.circleColor = 'rgb(50, 168, 52)'

    } else if(this.saleStatus === this.searchService.listingTypes.Pending){

      this.saleStatusDisplayString = 'pending'
      this.circleColor = 'rgb(255, 179, 0)'
    
    } else if(this.saleStatus === this.searchService.listingTypes.Sold){

      this.saleStatusDisplayString = 'sold'
      this.circleColor = 'rgb(255, 21, 0)'
    }


    // Set home type
    this.homeTypeDisplayString = Object.entries(this.searchService.propTypes).find(([key, value]) => value === this.homeType)?.[0] || '';
    
    // Make status capitol if house type not found
    if(this.homeTypeDisplayString === ''){
      this.saleStatusDisplayString = this.saleStatusDisplayString.charAt(0).toUpperCase() + this.saleStatusDisplayString.slice(1);
    }

  }
}
