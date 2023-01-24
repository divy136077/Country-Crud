import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CountryFormRoutingModule } from "./country-form-routing.module";
import { CountryFormComponent } from "./country-form.component";

@NgModule({
  imports: [CommonModule, CountryFormRoutingModule, NgModule , FormsModule, ReactiveFormsModule],
  declarations: [CountryFormComponent]
})
export class ListviewviewModule { }