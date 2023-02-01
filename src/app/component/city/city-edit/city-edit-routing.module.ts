import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CityEditComponent } from './city-edit.component'


const routes: Routes = [
    { path: '', component: CityEditComponent },


];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CityEditRoutingModule { }