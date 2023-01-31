import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {CityEditRoutingModule } from "./city-edit-routing.module";
import { CityEditComponent } from "./city-edit.component";

@NgModule({
  imports: [CommonModule, CityEditRoutingModule, NgModule, FormsModule, ReactiveFormsModule],
  declarations: [CityEditComponent]
})
export class CityEditModule { }