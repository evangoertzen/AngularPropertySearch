import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyViewComponent } from './components/home-page/property-view/property-view.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PropertyPanelComponent } from './components/home-page/property-view/property-panel/property-panel.component';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Nora from '@primeng/themes/nora';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { SearchFormComponent } from "./components/home-page/search-form/search-form.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { RentDisplayComponent } from './components/analysis/shared/rent-display/rent-display.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AnalysisComponent } from './components/analysis/analysis.component';
import { MapComponent } from './components/map/map.component';
import { ProfitLossComponent } from './components/analysis/profit-loss/profit-loss.component';
import { MortgageCalcComponent } from "./components/analysis/mortgage-calc/mortgage-calc.component";
import { MatTabsModule } from '@angular/material/tabs';
import { ChartModule } from 'primeng/chart';
import { FullHomeInfoComponent } from "./components/analysis/full-home-info/full-home-info.component";
import { TabViewModule } from 'primeng/tabview';
import { MatCardModule } from '@angular/material/card';
import { TaxGraphComponent } from './components/analysis/tax-graph/tax-graph.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EquityAnalysisComponent } from './components/analysis/equity-analysis/equity-analysis.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Select, SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
import { NumericalInputComponent } from './components/analysis/shared/numerical-input/numerical-input.component';
import { LeverToggleComponent } from "./components/analysis/shared/lever-toggle/lever-toggle.component";
import { CommonButtonComponent } from './components/shared/common-button/common-button.component';
import { HomeTypeAndStatusComponent } from "./components/shared/home-type-and-status/home-type-and-status.component";
import { RentDialogComponent } from './components/analysis/shared/rent-display/rent-dialog/rent-dialog/rent-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterAndSortComponent } from './components/home-page/property-view/filter-and-sort/filter-and-sort.component';
import { MatRadioModule } from '@angular/material/radio';
import { AdvancedSortDialogComponent } from './components/home-page/property-view/filter-and-sort/advanced-sort-dialog/advanced-sort-dialog.component';
import { FilterToggleComponent } from './components/home-page/property-view/filter-and-sort/filter-toggle/filter-toggle.component';

@NgModule({ 
    declarations: [
        AppComponent,
        PropertyViewComponent,
        PropertyPanelComponent,
        SearchFormComponent,
        RentDisplayComponent,
        HomePageComponent,
        NavbarComponent,
        AnalysisComponent,
        MapComponent,
        ProfitLossComponent,
        MortgageCalcComponent,
        FullHomeInfoComponent,
        TaxGraphComponent,
        EquityAnalysisComponent,
        NumericalInputComponent,
        LeverToggleComponent,
        CommonButtonComponent,
        HomeTypeAndStatusComponent,
        RentDialogComponent,
        FilterAndSortComponent,
        AdvancedSortDialogComponent,
        FilterToggleComponent
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        AppRoutingModule,
        PanelModule,
        BrowserAnimationsModule,
        ProgressBarModule,
        ProgressSpinnerModule,
        ToastModule,
        DialogModule,
        ReactiveFormsModule,
        MatSliderModule,
        FormsModule,
        MatTabsModule,
        ChartModule,
        TabViewModule,
        MatCardModule,
        MatTooltipModule,
        MatFormFieldModule,
        SelectModule,
        DropdownModule,
        MatDialogModule,
        MatRadioModule
    ], 
    providers: [
        provideHttpClient(withInterceptorsFromDi()), 
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Nora } })
    ]
 })
export class AppModule { }
