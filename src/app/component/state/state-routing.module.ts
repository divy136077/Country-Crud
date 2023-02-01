import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StateEditComponent } from './state-edit/state-edit.component'
import { StateComponent } from "./state-add/state.component";
import { StateMainComponent } from "./state.component";



const routes: Routes = [
    { path: '', component: StateMainComponent },
    { path: 'add', component: StateComponent },
    { path: 'edit/:id', component: StateEditComponent },

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class StateRoutingModule { }