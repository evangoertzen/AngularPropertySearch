import { Component, Input, OnInit } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-full-home-info [property]',
  templateUrl: './full-home-info.component.html',
  styleUrl: './full-home-info.component.css',
  standalone: false
})
export class FullHomeInfoComponent {

  @Input() property!: PropertyModel;

  mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  
  lineChartData: any;

  constructor(
    private sanitizer: DomSanitizer
  ){}

  ngOnChanges(): void {
    if (this.property?.latitude && this.property?.longitude) {
      const unsafeUrl = `https://www.google.com/maps?q=${encodeURIComponent(this.property.street + ', ' + this.property.city + ', ' + this.property.state)}&output=embed`;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
    }
  }

  formatCurrency(value: number): string {
    return value ? `$${value.toLocaleString()}` : 'N/A';
  }
}
