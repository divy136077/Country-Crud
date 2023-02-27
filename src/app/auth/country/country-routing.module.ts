import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CountryFormComponent } from "./country-form/country-form.component";
import { CountryListComponent } from "./country-list/country-list.component";

import { CountryComponent } from "./country.component";



const routes: Routes = [
    {
        path: '',
        component: CountryComponent,
        children: [
            { path: '',  component : CountryListComponent },
            { path: 'add', loadChildren: () => import('./country-form/country-form.module').then(x => x.CountryFormModule) },
            { path: 'edit/:id', loadChildren: () => import('./country-form/country-form.module').then(x => x.CountryFormModule) },
        ]
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CountryRoutingModule { }