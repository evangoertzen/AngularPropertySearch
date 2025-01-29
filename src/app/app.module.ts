import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyViewComponent } from './components/property-view/property-view.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PropertyPanelComponent } from './components/property-panel/property-panel.component';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

@NgModule({ 
    declarations: [
        AppComponent,
        PropertyViewComponent,
        PropertyPanelComponent,
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule, 
        AppRoutingModule, 
        PanelModule, 
        BrowserAnimationsModule
    ], 
    providers: [
        provideHttpClient(withInterceptorsFromDi()), 
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        })
    ] })
export class AppModule { }
