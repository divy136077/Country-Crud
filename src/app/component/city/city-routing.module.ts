import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CityEditComponent } from './city-edit/city-edit.component'
import { CityComponent } from "./city-add/city.component";
import { CityCityComponent } from "./city.component";



const routes: Routes = [
    { path: '', component: CityCityComponent },
    { path: 'add', component: CityComponent },
    { path: 'edit/:id', component: CityComponent },


    // { path: 'add', loadChildren: () => import('./city-add/city-routing.module').then(x => x.CityRoutingModule) },
    // { path: 'edit/:id', loadChildren: () => import('./city-edit/city-edit-routing.module').then(x => x.CityEditRoutingModule) },



];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CityRoutingModule { }