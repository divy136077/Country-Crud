import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CityRoutingModule } from "./city-routing.module";
import { CityCityComponent } from "./city.component";
import { CityListComponent } from './city-list/city-list.component';

@NgModule({
  imports: [CommonModule, CityRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [CityCityComponent, CityListComponent]
})
export class CityModule { }