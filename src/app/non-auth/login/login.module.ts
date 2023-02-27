import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  imports: [CommonModule, LoginRoutingModule, FormsModule, ReactiveFormsModule,],
  declarations: [LoginComponent]
})
export class LoginviewModule { }