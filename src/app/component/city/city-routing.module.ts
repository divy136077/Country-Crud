import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CityComponent } from "./city-add/city.component";
import { CityCityComponent } from "./city.component";



const routes: Routes = [
    { path: '', component: CityCityComponent },
    { path: 'add', component: CityComponent },
    { path: 'edit/:id', component: CityComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CityRoutingModule { }