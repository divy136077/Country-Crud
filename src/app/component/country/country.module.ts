import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CountryRoutingModule } from "./country-routing.module";
import { CountryComponent } from "./country.component";
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [CommonModule, CountryRoutingModule, NgModule, FormsModule, ReactiveFormsModule ,Ng2SearchPipeModule ],
  declarations: [CountryComponent]
})
export class CountryModule { }