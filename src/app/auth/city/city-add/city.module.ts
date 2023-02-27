import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CityRoutingModule } from "./city-routing.module";
import { CityComponent } from "./city.component";

@NgModule({
  imports: [CommonModule, CityRoutingModule, ReactiveFormsModule],
  declarations: [CityComponent]
})
export class CityModule { }