import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryFormComponent } from './component/country/country-form/country-form.component';
import { StateComponent } from './component/state/state-add/state.component';
import { StateMainComponent } from "./component/state/state.component";


import { CityComponent } from './component/city/city-add/city.component';
import { CityCityComponent } from './component/city/city.component';

import { InterceptorService } from './interceptor.service';
import { ServiceService } from './api-services.service';
import { CountryComponent } from './component/country/country.component';
import { UserComponent } from './component/user/user.component';
import { AddEditComponent } from './component/user/add-edit/add-edit.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    CountryFormComponent,
    StateComponent,
    StateMainComponent,
    CityCityComponent,
    CityComponent,
    CountryComponent,
    UserComponent,
    AddEditComponent,
    DashboardComponent,



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  providers: [ServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

