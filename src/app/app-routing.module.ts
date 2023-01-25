import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';

const routes: Routes = [

  { path: 'country-form', loadChildren: () => import('./component/country-form/country-form-routing.module').then(x => x.CountryFormRoutingModule) },

  { path: 'state', loadChildren: () => import('./component/state/state-routing.module').then(x => x.StateRoutingModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),ToastrModule.forRoot() ],
  exports: [RouterModule], 
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
