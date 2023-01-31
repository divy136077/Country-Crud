import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {CountryFormEditRoutingModule } from "./country-form-edit-routing.module";
import { CountryFormEditComponent } from "./country-form-edit.component";

@NgModule({
  imports: [CommonModule, CountryFormEditRoutingModule, NgModule, FormsModule, ReactiveFormsModule],
  declarations: [CountryFormEditComponent]
})
export class CountryFormEditModule { }