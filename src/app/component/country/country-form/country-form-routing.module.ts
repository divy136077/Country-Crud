import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CountryFormComponent } from './country-form.component'


const routes: Routes = [
    { path: '', component: CountryFormComponent },


];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CountryFormRoutingModule { }