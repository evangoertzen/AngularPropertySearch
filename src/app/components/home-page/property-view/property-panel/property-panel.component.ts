import { Component, Input } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';
import { CalculatorServiceService } from 'src/app/services/calculator-service/calculator-service.service';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';

@Component({
    selector: 'app-property-panel [property]',
    templateUrl: './property-panel.component.html',
    styleUrls: ['./property-panel.component.css'],
    standalone: false
})
export class PropertyPanelComponent {

    @Input() property!: PropertyModel;

    constructor(
        public calcService: CalculatorServiceService,
        private searchService: PropertySearchService
    ){}

    mouseOver(){
        this.searchService.hoveringPropIdSubject.next(this.property.mls_id);
    }

    mouseOut(){
        this.searchService.hoveringPropIdSubject.next('');
    }

}
