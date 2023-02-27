import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StateComponent } from "./state-add/state.component";
import { StateListComponent } from "./state-list/state-list.component";
import { StateMainComponent } from "./state.component";



const routes: Routes = [
    {
        path: '',
        component: StateMainComponent,
        children: [
            { path: '',  component : StateListComponent },
            { path: 'add', loadChildren: () => import('./state-add/state.module').then(x => x.StateModule)},
            { path: 'edit/:id',loadChildren: () => import('./state-add/state.module').then(x => x.StateModule) },
        ]
    }
    // { path: '', component: StateMainComponent },

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class StateRoutingModule { }