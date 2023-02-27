import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from './layout.component'
import { HeaderComponent } from './header/header.component'
import { AuthGuard } from "src/app/gaurd/auth.guard";


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./../dashboard/dashboard.module').then(x => x.DashboardModule),canActivate: [AuthGuard] },

            { path: 'city', loadChildren: () => import('./../city/city.module').then(x => x.CityModule),canActivate: [AuthGuard] },

            { path: 'country', loadChildren: () => import('./../country/country.module').then(x => x.CountryModule),canActivate: [AuthGuard] },

            { path: 'state', loadChildren: () => import('./../state/state.module').then(x => x.StateModule),canActivate: [AuthGuard] },

            { path: 'user', loadChildren: () => import('./../user/user.module').then(x => x.UserModule) },
        ]
    }

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class LayoutRoutingModule { }