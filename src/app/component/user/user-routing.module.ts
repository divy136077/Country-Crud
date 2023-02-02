import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEditComponent } from "./add-edit/add-edit.component";
import { UserComponent } from "./user.component";



const routes: Routes = [
    { path: '', component: UserComponent },
    { path: 'add', component: AddEditComponent },
    { path: 'edit/:id', component: AddEditComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class UserRoutingModule { }