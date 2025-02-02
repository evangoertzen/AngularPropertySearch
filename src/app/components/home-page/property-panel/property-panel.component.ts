import { Component, Input } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { CalculatorServiceService } from 'src/app/services/calculator-service/calculator-service.service';

@Component({
    selector: 'app-property-panel [property]',
    templateUrl: './property-panel.component.html',
    styleUrls: ['./property-panel.component.css'],
    standalone: false
})
export class PropertyPanelComponent {

    @Input() property!: PropertyModel;

    constructor(
        public calcService: CalculatorServiceService
    ){}

}
