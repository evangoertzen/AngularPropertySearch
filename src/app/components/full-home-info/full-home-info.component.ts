import { Component, Input } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';

@Component({
  selector: 'app-full-home-info [property]',
  templateUrl: './full-home-info.component.html',
  styleUrl: './full-home-info.component.css',
  standalone: false
})
export class FullHomeInfoComponent {

  @Input()
  property: PropertyModel | null = null;

}
