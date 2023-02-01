import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StateEditComponent } from './state-edit.component'


const routes: Routes = [
    { path: '', component: StateEditComponent },


];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class StateEditRoutingModule { }