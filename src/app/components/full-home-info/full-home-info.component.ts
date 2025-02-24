import { Component, Input, OnInit } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-full-home-info [property]',
  templateUrl: './full-home-info.component.html',
  styleUrl: './full-home-info.component.css',
  standalone: false
})
export class FullHomeInfoComponent implements OnInit{

  @Input() property!: PropertyModel;

  mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  
  lineChartData: any;

  constructor(
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    const reversedData = [...this.property.tax_history].reverse();
    const labels = reversedData.map(point => point.year);
    const values = reversedData.map(point => point.tax);

    this.lineChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Property Tax',
          data: values,
          borderColor: '#42A5F5',
          fill: true,
          tension: 0.4
        }
      ]
    };
  }

  ngOnChanges(): void {
    if (this.property?.latitude && this.property?.longitude) {
      const unsafeUrl = `https://www.google.com/maps?q=${encodeURIComponent(this.property.full_street_line + ', ' + this.property.city + ', ' + this.property.state)}&output=embed`;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
    }
  }

  formatCurrency(value: number): string {
    return value ? `$${value.toLocaleString()}` : 'N/A';
  }

  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value: number) {
            return '$' + value.toLocaleString(); // Adds $ and formats with commas
          }
        }
      }
    }
  };
}
