import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddEditRoutingModule } from "./add-edit-routing.module";
import { AddEditComponent } from "./add-edit.component";

@NgModule({
  imports: [CommonModule, AddEditRoutingModule, ReactiveFormsModule],
  declarations: [AddEditComponent]
})
export class AddEditModule { }