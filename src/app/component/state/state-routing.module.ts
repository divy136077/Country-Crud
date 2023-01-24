import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StateComponent } from './state.component'


const routes: Routes = [
    { path: '', component: StateComponent },


];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class StateRoutingModule { }