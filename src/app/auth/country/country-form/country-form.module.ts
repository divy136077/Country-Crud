import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CountryFormRoutingModule } from "./country-form-routing.module";
import { CountryFormComponent } from "./country-form.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  imports: [CommonModule, CountryFormRoutingModule, ReactiveFormsModule],
  declarations: [CountryFormComponent],
  bootstrap: [CountryFormComponent]
})
export class CountryFormModule { }