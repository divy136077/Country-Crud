import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { projectName } from 'src/app/constant/constant';
import { RegexEnum } from 'src/app/constant/regex';
import { confirmPassword } from 'src/app/modules/auth/confirm-password/confirm-password.validator';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {

  confirmPasswordForm!: FormGroup
  hasError: boolean;
  isReadonly: boolean = true;
  email: any;
  temp:any;
  readonly: boolean = true;

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private url: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.titleService.setTitle(projectName + ' | Confirm Password');
    this.initForm();

    const emailData = this.url.snapshot.queryParams.Email
    console.log('---')
    console.log(emailData)
    const decodeodEmailToken =jwt_decode(emailData)
    const email = Object.values(decodeodEmailToken)
    this.temp = email[0]
  
    console.log('---')
  }

  initForm() {
    this.confirmPasswordForm = this.fb.group({
      // email: [
      //   '',
      //   Validators.compose([
      //     Validators.required,
      //     Validators.email,
      //     Validators.pattern(RegexEnum.email),
      //     Validators.minLength(3),
      //     Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
      //   ]),
      // ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(100),
          Validators.pattern(RegexEnum.passwordValidation)
        ]),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(100),
          Validators.pattern(RegexEnum.passwordValidation)
        ]),
      ]
    },
      {
        validator: confirmPassword.MatchPassword
      });
  }

  submit() {
    this.hasError = false;
    const controls = this.confirmPasswordForm.controls;
    if (this.confirmPasswordForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.authService.updatePasswordByEmail(this.temp , this.confirmPasswordForm.value).subscribe((res: any) => {
      this.router.navigate(['/auth/login'])
    })

  }


  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.confirmPasswordForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

}
