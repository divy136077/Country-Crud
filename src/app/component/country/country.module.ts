import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CountryRoutingModule } from "./country-routing.module";
import { CountryComponent } from "./country.component";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [CommonModule,BrowserModule,HttpClientModule, CountryRoutingModule, NgModule, FormsModule, ReactiveFormsModule ,Ng2SearchPipeModule ],
  declarations: [CountryComponent]
})
export class CountryModule { }