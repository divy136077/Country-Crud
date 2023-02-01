import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CountryFormEditComponent } from './country-form-edit/country-form-edit.component'
import { CountryFormComponent } from "./country-form/country-form.component";
import { CountryComponent } from "./country.component";



const routes: Routes = [
    { path: '', component: CountryComponent },
    { path: 'add', component: CountryFormComponent },
    { path: 'edit/:id', component: CountryFormEditComponent },


    // { path: 'add', loadChildren: () => import('./city-add/city-routing.module').then(x => x.CityRoutingModule) },
    // { path: 'edit/:id', loadChildren: () => import('./city-edit/city-edit-routing.module').then(x => x.CityEditRoutingModule) },



];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CountryRoutingModule { }