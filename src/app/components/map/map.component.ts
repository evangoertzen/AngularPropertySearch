import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  standalone: false
})
export class MapComponent implements OnInit, OnDestroy {

  private map!: L.Map;

  ngOnInit(): void {
    // Initialize the map centered at a default location
    this.map = L.map('map').setView([37.7749, -122.4194], 12); // San Francisco

    // Add OpenStreetMap tile layer (Free & No API Key Needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Add a marker
    L.marker([37.7749, -122.4194]).addTo(this.map)
      .bindPopup('San Francisco')
      .openPopup();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

}
