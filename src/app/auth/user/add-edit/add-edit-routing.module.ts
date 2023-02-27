import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEditComponent } from './add-edit.component'


const routes: Routes = [
    { path: '', component: AddEditComponent },


];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class AddEditRoutingModule { }