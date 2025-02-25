import { Component, Input, OnInit } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';

@Component({
  selector: 'app-tax-graph [property]',
  templateUrl: './tax-graph.component.html',
  styleUrl: './tax-graph.component.css',
  standalone: false
})
export class TaxGraphComponent implements OnInit{

  @Input() property!: PropertyModel;

  lineChartData: any;

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
