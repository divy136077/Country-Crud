import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';

const routes: Routes = [

 
  { path: 'country', loadChildren: () => import('./component/country/country-routing.module').then(x => x.CountryRoutingModule) },

  { path: 'state', loadChildren: () => import('./component/state/state-routing.module').then(x => x.StateRoutingModule) },

  { path: 'city', loadChildren: () => import('./component/city/city-routing.module').then(x => x.CityRoutingModule) },

  { path: 'user', loadChildren: () => import('./component/user/user-routing.module').then(x => x.UserRoutingModule) },

  // { path: 'dashboard', loadChildren: () => import('./component/dashboard/dashboard-routing.module').then(x => x.DashboardRoutingModule) },




];

@NgModule({
  imports: [RouterModule.forRoot(routes), ToastrModule.forRoot()],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
