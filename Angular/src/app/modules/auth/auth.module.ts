import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthComponent } from './auth.component';
import { TranslationModule } from '../i18n/translation.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RegistrationComponent } from './registration/registration.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';
import { MatDialogModule } from '@angular/material/dialog';

import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
// import { RecaptchaModule } from 'angular-google-recaptcha';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthComponent,
    RegistrationComponent,
    SetPasswordComponent,
    VerifyEmailComponent,
    SignupSuccessComponent,
    ConfirmPasswordComponent,
  ],
  imports: [
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    RecaptchaFormsModule,
    RecaptchaModule
    // RecaptchaModule.forRoot({
    //   siteKey: '6LcnU0kgAAAAAD72UfSii97juuPAodvlMwB50vKA',
    // }),
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.siteKey,
      } as RecaptchaSettings,
    },
  ]
})
export class AuthModule { }
