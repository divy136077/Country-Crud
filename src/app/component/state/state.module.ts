import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StateRoutingModule } from "./state-routing.module";
import { StateComponent } from "./state.component";

@NgModule({
  imports: [CommonModule, StateRoutingModule, NgModule, FormsModule, ReactiveFormsModule],
  declarations: [StateComponent]
})
export class StateModule { }