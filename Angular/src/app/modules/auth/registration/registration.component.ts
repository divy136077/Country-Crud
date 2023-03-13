import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { UserModel } from '../_models/user.model';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationConfirmationComponent } from 'src/app/_metronic/partials/content/crud/registration-confirmation/registration-confirmation.component';
import { RegexEnum } from 'src/app/constant/regex';
import { Title } from '@angular/platform-browser';
import { projectName } from 'src/app/constant/constant';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;
  role: any;
  token: string|undefined;
  show: boolean;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private titleService: Title,
  ) {
    this.token = undefined;
    this.isLoading$ = this.authService.isLoading$;
    this.role = this.route.snapshot.routeConfig.path.split("/")[0];
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle(projectName + '| Registration')
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        first_name: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(RegexEnum.name),
            Validators.minLength(3),
            Validators.maxLength(40),
          ]),
        ],
        last_name: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(RegexEnum.name),
            Validators.minLength(3),
            Validators.maxLength(40),
          ]),
        ],
        phone: [
          '',
          Validators.compose([
            Validators.required,this.removeSpaces,
            Validators.pattern('^[0-9]*$'),
            Validators.minLength(10),
            Validators.maxLength(15),
          ]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.pattern(RegexEnum.email),
            Validators.minLength(3),
            Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])[A-Za-z\d" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]{8,15}$/),
          ]),
        ],
        cPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
               agree: [false, Validators.compose([Validators.required])],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }
  removeSpaces(c: FormControl) {
    if (c && c.value) {
      let removedSpaces = c.value.split(' ').join('');
      c.value !== removedSpaces && c.setValue(removedSpaces);
    }
    return null;
  }
  submit() {
    this.hasError = false;
    const controls = this.registrationForm.controls;
    if (this.registrationForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const result = {};
    Object.keys(this.f).forEach(key => {
      result[key] = this.f[key].value;
    });
    const newUser = new UserModel();
    newUser['role'] = 'storage-user';
    newUser.setUser(result);
    const registrationSubscr = this.authService
      .registration(newUser)
      .subscribe((user: UserModel) => {
        if (user) {
          this.toastr.success('You have successfully registered!', 'Success!');
          this.router.navigate(['/auth/signup-success']);
        } else {
          this.hasError = true;
        }
      }, error => {
        if (error.code == 420) {
          const dialogRef = this.dialog.open(RegistrationConfirmationComponent, {
            data: {
              description: error.message,
              title: 'Registration Confirmation',
              // waitDesciption: this.moduleName + ' is deleting...'
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              newUser['flag'] = true;
              this.authService
                .registration(newUser)
                .subscribe((user: UserModel) => {
                  if (user) {
                    this.toastr.success('You have successfully registered!', 'Success!');
                    this.router.navigate(['/auth/signup-success']);
                  } else {
                    this.hasError = true;
                  }
                });
            }
          })
        this.unsubscribe.push(registrationSubscr);
        }
      })
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.registrationForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

 /**
   * Toggle Password
   */
  togglePassword() {
    this.show = !this.show;
  }

}
