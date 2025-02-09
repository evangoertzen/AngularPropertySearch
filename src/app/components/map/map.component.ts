import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Subscription } from 'rxjs';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';

// may need these imports in the future if leaflet won't show icon
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
// import 'leaflet-defaulticon-compatibility';

const iconPath = "../../../assets/custom-marker.png"

const customIcon = L.icon({
  iconUrl: iconPath,
  iconSize: [32, 44], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon that will be anchored to the marker
  popupAnchor: [0, -32], // Where the popup will open relative to the icon
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  standalone: false
})

export class MapComponent implements OnInit, OnDestroy {

  private map!: L.Map;
  private refreshSubscription!: Subscription;

  // private locations: { name: string; coords: [number, number] }[] = [
  //   { name: 'San Francisco', coords: [37.7749, -122.4194] },
  //   { name: 'New York City', coords: [40.7128, -74.0060] },
  //   { name: 'Los Angeles', coords: [34.0522, -118.2437] },
  //   { name: 'Chicago', coords: [41.8781, -87.6298] }
  // ];

  private locations: { name: string; coords: [number, number] }[] = []

  constructor(
    private propertySearch: PropertySearchService
  ){}

  ngOnInit(): void {
    // Initialize the map centered at a default location
    this.map = L.map('map').setView([37.7749, -122.4194], 12); // San Francisco

    // Add OpenStreetMap tile layer (Free & No API Key Needed)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 20
    }).addTo(this.map);

    this.refreshSubscription = this.propertySearch.refresh$.subscribe(() => {
      this.refreshMap();
    });

      // this.refreshMap()
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  refreshMap(){
    this.propertySearch.properties.forEach( property => {
      this.locations.push(
        {
          name: property.mls_id,
          coords: [property.latitude, property.longitude]
        }
      )
      console.log("Added property to locations: " + this.locations.at(0))
    })

    // Add a marker
    this.locations.forEach(location => {
      L.marker(location.coords, {icon: customIcon})
        .addTo(this.map)
    });

    // L.marker([37.7749, -122.4194], {icon: customIcon}).addTo(this.map)

    const bounds = L.latLngBounds(this.locations.map(loc => loc.coords));
    this.map.fitBounds(bounds);
  }

}
