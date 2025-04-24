import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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
        return this.calcService.calcCashFlowInYear(
          0,
          this.property.rent * 12,
          this.property.list_price,
          this.analysisService.rentGrowthRate,
          this.analysisService.yr0_expenses.maintenance_rate,
          this.analysisService.yr0_expenses.management_fee_rate,
          this.analysisService.appreciationRate,
          this.property.tax,
          this.analysisService.yr0_expenses.insurance_dol,
          this.property.hoa_fee,
          this.analysisService.yr0_expenses.utilities_dol,
          this.analysisService.yr0_expenses.misc_expenses_dol,
          this.analysisService.yr0_expenses.vacancy_rate,
          this.analysisService.downPaymentPercentage,
          this.analysisService.loanTerm,
          this.analysisService.interestRate
        );
      }

    goToAnalysis(mlsId: string) {
        this.router.navigate(['analysis'], { queryParams: { mls_id: mlsId } });
    }

}
