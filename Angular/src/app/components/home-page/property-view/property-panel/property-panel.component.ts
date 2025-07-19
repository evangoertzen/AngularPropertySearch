import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { createDefaultGrowthModel } from 'src/app/models/equityGrowth.model';
import { createDefaultExpenses } from 'src/app/models/expenses.model';
import { createDefaultMortgageModel } from 'src/app/models/mortgage.model';
import { PropertyModel } from 'src/app/models/property.model';
import { AnalysisService } from 'src/app/services/analysis-service/analysis.service';
import { CalculatorService } from 'src/app/services/calculator-service/calculator-service.service';
import { FormatService } from 'src/app/services/format-service/format.service';
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
        public calcService: CalculatorService,
        private searchService: PropertySearchService,
        public analysisService: AnalysisService,
        public formatService: FormatService,
        private router: Router
    ){}

    mouseOver(){
        this.searchService.hoveringPropIdSubject.next(this.property.mls_id);
    }

    mouseOut(){
        this.searchService.hoveringPropIdSubject.next('');
    }

    get cashFlow(): number {
        return this.property.calcCashFlowInYear( 0, createDefaultExpenses(), createDefaultGrowthModel(), createDefaultMortgageModel() );
      }

    goToAnalysis(property_id: string) {
        this.router.navigate(['analysis'], { queryParams: { property_id: property_id } });
    }

}
