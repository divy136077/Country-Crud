import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryFormComponent } from './component/country-form/country-form.component';
import { StateComponent } from './component/state/state.component';
import { CityComponent } from './component/city/city.component';
import { InterceptorService } from './interceptor.service';
import {ServiceService} from './api-services.service';
import { CityEditComponent } from './component/city-edit/city-edit.component';
import { CountryFormEditComponent } from './component/country-form-edit/country-form-edit.component';
import { StateEditComponent } from './component/state-edit/state-edit.component'

@NgModule({
  declarations: [
    AppComponent,
    CountryFormComponent,
    StateComponent,
    CityComponent,
    CityEditComponent,
    CountryFormEditComponent,
    StateEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ ServiceService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

