import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StateRoutingModule } from "./state-routing.module";
import { StateMainComponent } from "./state.component";
import { StateListComponent } from './state-list/state-list.component';

@NgModule({
  imports: [CommonModule, StateRoutingModule,FormsModule, ReactiveFormsModule],
  declarations: [StateMainComponent, StateListComponent]
})
export class StateModule { }