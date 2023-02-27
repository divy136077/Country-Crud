import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { NgChartsModule } from 'ng2-charts'
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { AppRoutingModule } from "src/app/app-routing.module";

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    FormsModule
  ],

  declarations: [DashboardComponent],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }