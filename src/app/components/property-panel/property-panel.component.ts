import { Component, Input } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';

@Component({
    selector: 'app-property-panel [property]',
    templateUrl: './property-panel.component.html',
    styleUrls: ['./property-panel.component.css'],
    standalone: false
})
export class PropertyPanelComponent {

    @Input() property!: PropertyModel;

}
