import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CityRoutingModule } from "./city-routing.module";
import { CityCityComponent } from "./city.component";

@NgModule({
  imports: [CommonModule, CityRoutingModule, NgModule, FormsModule, ReactiveFormsModule],
  declarations: [CityCityComponent]
})
export class CityModule { }