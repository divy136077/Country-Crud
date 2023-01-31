import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StateEditRoutingModule } from "./state-edit-routing.module";
import { StateEditComponent } from "./state-edit.component";

@NgModule({
  imports: [CommonModule, StateEditRoutingModule, NgModule, FormsModule, ReactiveFormsModule],
  declarations: [StateEditComponent]
})
export class StateEditModule { }