import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: false
})
export class NavbarComponent implements OnInit{
  isHomeRoute = false;

  constructor(
    private router: Router,
    public searchService: PropertySearchService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isHomeRoute = this.router.url === '/';
    });
  }

}
