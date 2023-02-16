import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  { path: 'login', loadChildren: () => import('./component/login/login-routing.module').then(x => x.LoginRoutingModule) },

  { path: 'country', loadChildren: () => import('./component/country/country-routing.module').then(x => x.CountryRoutingModule),canActivate: [AuthGuard] },

  { path: 'state', loadChildren: () => import('./component/state/state-routing.module').then(x => x.StateRoutingModule),canActivate: [AuthGuard] },

  { path: 'city', loadChildren: () => import('./component/city/city-routing.module').then(x => x.CityRoutingModule),canActivate: [AuthGuard] },

  { path: 'user', loadChildren: () => import('./component/user/user-routing.module').then(x => x.UserRoutingModule),  },

  { path: '', loadChildren: () => import('./component/dashboard/dashboard-routing.module').then(x => x.DashboardRoutingModule) },




];

@NgModule({
  imports: [RouterModule.forRoot(routes), ToastrModule.forRoot()],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
