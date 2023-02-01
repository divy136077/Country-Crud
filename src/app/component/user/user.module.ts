import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";

@NgModule({
  imports: [CommonModule, UserRoutingModule, NgModule, FormsModule, ReactiveFormsModule],
  declarations: [UserComponent]
})
export class UserModule { }