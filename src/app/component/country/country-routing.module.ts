import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CountryFormComponent } from "./country-form/country-form.component";
import { CountryComponent } from "./country.component";



const routes: Routes = [
    { path: '', component: CountryComponent },
    { path: 'add', component: CountryFormComponent },
    { path: 'edit/:id', component: CountryFormComponent },


];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CountryRoutingModule { }