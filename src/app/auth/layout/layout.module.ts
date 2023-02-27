import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutRoutingModule } from "./layout-routing.module";
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from "./header/header.component"
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";


@NgModule({
  imports: [CommonModule, LayoutRoutingModule, ReactiveFormsModule],
  declarations: [LayoutComponent, HeaderComponent],


})
export class LayoutModule { }