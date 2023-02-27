import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CityListComponent } from "./city-list/city-list.component";
import { CityCityComponent } from "./city.component";



const routes: Routes = [
    {
        path: '',
        component: CityCityComponent,
        children: [
            { path: '',  component : CityListComponent },
            { path: 'add', loadChildren: () => import('./city-add/city.module').then(x => x.CityModule) },
            { path: 'edit/:id', loadChildren: () => import('./city-add/city.module').then(x => x.CityModule) },
        ]
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CityRoutingModule { }