import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { AuthService, UserModel } from '../../auth';
import { ConfirmPasswordValidator } from '../../auth/registration/confirm-password.validator';
import { API_ROUTES, validationLength } from 'src/app/constant/constant';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: UserModel;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;
  moduleNameServiceRoute = API_ROUTES.USER;
  constructor(private userService: AuthService, private fb: FormBuilder, private commonService: CommonService) {
    this.isLoading$ = this.userService.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    const sb = this.userService.currentUserSubject.asObservable().pipe(
      first(user => !!user)
    ).subscribe(user => {
      this.user = Object.assign({}, user);
      this.firstUserState = Object.assign({}, user);
      this.loadForm();
    });
    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      currentPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])[A-Za-z\d" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]{8,15}$/),
        ]),
      ],
      password:  [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])[A-Za-z\d" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]{8,15}$/),
        ]),
      ],
      cPassword: ['', Validators.required]
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  save() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }
    this.user.password = this.formGroup.value.password;
    const data = {
      newPassword : this.formGroup.value.password,
      oldPassword : this.formGroup.value.currentPassword,
      confirmPassword : this.formGroup.value.cPassword,
      user_id: this.user.id
    };
    this.commonService.changePassword(data, this.moduleNameServiceRoute).subscribe(res => {
      this.formGroup.reset();
    });
  }

  cancel() {
    this.user = Object.assign({}, this.firstUserState);
    this.loadForm();
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}
