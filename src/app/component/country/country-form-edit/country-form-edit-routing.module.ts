import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CountryFormEditComponent } from './country-form-edit.component'


const routes: Routes = [
    { path: '', component: CountryFormEditComponent },


];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CountryFormEditRoutingModule { }