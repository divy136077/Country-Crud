import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CountryFormRoutingModule } from "./country-form-routing.module";
import { CountryFormComponent } from "./country-form.component";

@NgModule({
  imports: [CommonModule, CountryFormRoutingModule, NgModule],
  declarations: [CountryFormComponent]
})
export class ListviewviewModule { }