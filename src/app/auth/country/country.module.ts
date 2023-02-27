import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CountryRoutingModule } from "./country-routing.module";
import { CountryComponent } from "./country.component";
import { CountryListComponent } from './country-list/country-list.component';



@NgModule({
  imports: [CommonModule, CountryRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [CountryComponent, CountryListComponent],
  bootstrap: [CountryComponent]
})
export class CountryModule { }