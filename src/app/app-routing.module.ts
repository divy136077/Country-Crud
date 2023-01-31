import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';

const routes: Routes = [

  { path: 'country-form', loadChildren: () => import('./component/country-form/country-form-routing.module').then(x => x.CountryFormRoutingModule) },
  { path: 'country-form/edit/:id', loadChildren: () => import('./component/country-form-edit/country-form-edit-routing.module').then(x => x.CountryFormEditRoutingModule) },


  { path: 'state', loadChildren: () => import('./component/state/state-routing.module').then(x => x.StateRoutingModule) },
  { path: 'state/edit/:id', loadChildren: () => import('./component/state-edit/state-edit-routing.module').then(x => x.StateEditRoutingModule) },


  { path: 'city', loadChildren: () => import('./component/city/city-routing.module').then(x => x.CityRoutingModule) },
  { path: 'city/edit/:id', loadChildren: () => import('./component/city-edit/city-edit-routing.module').then(x => x.CityEditRoutingModule) },





];

@NgModule({
  imports: [RouterModule.forRoot(routes), ToastrModule.forRoot()],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
