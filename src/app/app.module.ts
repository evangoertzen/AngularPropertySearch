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
import Aura from '@primeng/themes/aura';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { SearchFormComponent } from "./components/home-page/search-form/search-form.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { RentDisplayComponent } from "./components/home-page/property-view/property-panel/rent-display/rent-display/rent-display.component";
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AnalysisComponent } from './components/analysis/analysis.component';
import { MapComponent } from './components/map/map.component';
import { ProfitLossComponent } from './components/analysis/profit-loss/profit-loss.component';
import { MortgageCalcComponent } from "./components/analysis/mortgage-calc/mortgage-calc.component";
import { MatTabsModule } from '@angular/material/tabs';

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
        MortgageCalcComponent
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
    MatTabsModule
], 
    providers: [
        provideHttpClient(withInterceptorsFromDi()), 
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura } })
    ]
 })
export class AppModule { }
