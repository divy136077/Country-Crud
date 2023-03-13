import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService, UserModel } from '../../auth';
import { ConfirmPasswordValidator } from '../registration/confirm-password.validator';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { API_ROUTES, validationLength } from 'src/app/constant/constant';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  formGroup: FormGroup;
  user: UserModel;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;
  moduleNameServiceRoute = API_ROUTES.USER;
  token: any;
  show: boolean;
  showcnf: boolean;
  constructor(
    private userService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.loadForm();
    this.isLoading$ = this.userService.isLoadingSubject.asObservable();
    this.token = this.route.snapshot.params.token;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    const sb = this.userService.currentUserSubject.asObservable().pipe(
      first(user => !!user)
    ).subscribe(user => {
      this.user = Object.assign({}, user);
      this.firstUserState = Object.assign({}, user);
    });
    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      password: ['',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])[A-Za-z\d" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]{8,15}$/),
      ]),],
      cPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])[A-Za-z\d" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]{8,15}$/),
        ]),
      ],
    },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  save() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }
    const obj = {
      newPassword: this.formGroup.value.password,
      token: this.token,
    };
    this.commonService.resetPassword(obj, this.moduleNameServiceRoute).subscribe(res => {

      if (res.status) {
        // this.router.navigateByUrl('/auth/login');
        this.router.navigate(['/auth/login']).then(() => {
          this.toastr.success(res.message, 'Success!');
        });
      } else {
        if (res.message) {
          this.toastr.error(res.message, 'Error!');
        }
      }
    }, err => { });
    // this.user.password = this.formGroup.value.password;
    // this.userService.isLoadingSubject.next(true);
    // setTimeout(() => {
    //   this.userService.currentUserSubject.next(Object.assign({}, this.user));
    //   this.userService.isLoadingSubject.next(false);
    // }, 2000);
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
  /**
   * Toggle Password
   */
   togglePassword() {
    this.show = !this.show;
  }
  /**
   * Toggle Password
   */
   toggleconfirmPassword() {
    this.showcnf = !this.showcnf;
  }

}
