import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LogoutComponent} from './logout/logout.component';
import { RegistrationComponent } from './registration/registration.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {returnUrl: window.location.pathname}
      },
      {
        path: 'registration',
        component: RegistrationComponent,
        data: {returnUrl: window.location.pathname}
      },
      {
        path: 'confirm-password',
        component: ConfirmPasswordComponent,
        data: {returnUrl: window.location.pathname}
      },
      {
        path: 'node-operator/registration',
        component: RegistrationComponent,
        data: {returnUrl: window.location.pathname}
      },
      {
        path: 'network-operator/registration',
        component: RegistrationComponent,
        data: {returnUrl: window.location.pathname}
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
				path: 'set-password/:token',
				component: SetPasswordComponent,
      },
      {
				path: 'confirm-account/:token',
				component: VerifyEmailComponent,
      },
      {
				path: 'signup-success',
				component: SignupSuccessComponent,
      },
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '', redirectTo: 'login', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {}
