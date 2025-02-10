import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Subscription } from 'rxjs';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';
import { Router } from '@angular/router';

// may need these imports in the future if leaflet won't show icon
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
// import 'leaflet-defaulticon-compatibility';

const iconPath = "../../../assets/custom-marker.png"

// const customIcon = L.icon({
//   iconUrl: iconPath,

//   iconSize: [30, 44], // Size of the icon
//   iconAnchor: [16, 32], 
//   popupAnchor: [0, -32],
//   className: 'custom-marker'
// });

const customIcon = L.divIcon({
  className: 'custom-marker',
  html: '<i class="material-icons">location_on</i>',
  iconSize: [50, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
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

  private locations: { mls_id: string; coords: [number, number] }[] = [];

  constructor(
    private propertySearch: PropertySearchService,
    private router: Router
  ){}

  ngOnInit(): void {
    // Initialize the map centered at a default location
    this.map = L.map('map').setView([this.propertySearch.mapBounds.getNorth(), this.propertySearch.mapBounds.getWest()], 12); // San Francisco

    // Add OpenStreetMap tile layer (Free & No API Key Needed)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 20
    }).addTo(this.map);

    // Refresh when search returns
    this.refreshSubscription = this.propertySearch.refresh$.subscribe(() => {
      this.refreshMap();
    });

    // If route to home page, refresh map markers
    if(this.propertySearch.properties.length !== 0){
      this.refreshMap()
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  refreshMap(){
    this.locations = [];

    // remove previous markers if user searches again
    this.map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // store locations
    this.propertySearch.properties.forEach( property => {
      this.locations.push(
        {
          mls_id: property.mls_id,
          coords: [property.latitude, property.longitude]
        }
      )
    })

    // add markers to map
    this.locations.forEach(location => {
      L.marker(location.coords, 
        {
          riseOnHover: true,
          icon: customIcon,
        })
        .addTo(this.map)
        .on('click', () => this.markerClicked(location.mls_id));
    });

    // float to markers
    const bounds = L.latLngBounds(this.locations.map(loc => loc.coords));
    this.propertySearch.mapBounds = bounds;
    this.map.flyToBounds(bounds);
  }

  markerClicked(mls_id: String){
    console.log("Clicked on property: " + mls_id);
    this.router.navigate(['analysis'], { queryParams: { mls_id: mls_id } })
  }

}
