import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './gaurd/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./non-auth/login/login.module').then(x => x.LoginviewModule) },
  { path: 'auth', loadChildren: () => import('./auth/layout/layout.module').then(x => x.LayoutModule)  },
];
// canActivate: [AuthGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
