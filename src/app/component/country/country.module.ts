import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CountryRoutingModule } from "./country-routing.module";
import { CountryComponent } from "./country.component";

@NgModule({
  imports: [CommonModule, CountryRoutingModule, NgModule, FormsModule, ReactiveFormsModule],
  declarations: [CountryComponent]
})
export class CountryModule { }