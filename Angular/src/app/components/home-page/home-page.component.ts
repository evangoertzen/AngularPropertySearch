import { Component, OnInit } from '@angular/core';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone: false
})
export class HomePageComponent implements OnInit {

  constructor(
    public searchService: PropertySearchService
  ){}

  ngOnInit(){
    // clear the filters on property list on init
    this.searchService.resetPropertyList();
  }

}
