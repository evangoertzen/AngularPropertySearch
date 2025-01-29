import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyViewComponent } from './components/property-view/property-view.component';
import { HttpClientModule } from '@angular/common/http';
import { PropertyPanelComponent } from './components/property-panel/property-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertyViewComponent,
    PropertyPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
