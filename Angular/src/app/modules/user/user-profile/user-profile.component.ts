import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { RegexEnum } from 'src/app/constant/regex';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import * as moment from 'moment';
import { API_ROUTES, validationLength } from 'src/app/constant/constant';
import { GridOption } from 'src/app/_metronic/shared/crud-table/models/gridoption.model';
import { Observable } from 'rxjs/internal/Observable';

import { DeleteEntityDialogComponent } from 'src/app/_metronic/partials/content/crud/delete-entity-dialog/delete-entity-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { MustMatch } from '../helper/must-match.validator';
import { MustNotMatch } from '../helper/must-not-match.validator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  userId: number;
  pdstate = false;

  userEmail: any;
  userForm: FormGroup;
  changePasswordForm: FormGroup;
  clientArr : any;
  clientArrLength = 0;
  statusArr: any = [
    { value: this.translateService.instant('PAGES.COMMON.ACTIVE'), key: 1 },
    { value: this.translateService.instant('PAGES.COMMON.INACTIVE'), key: 0 }];
  payedArr: any = [
    { value: 'Yes', key: 1 },
    { value: 'No', key: 0 }];
  moduleNameServiceRoute = API_ROUTES.USER;
  rolesArr: any = [];
  countryArr: any = [
    { name: 'India', countryCode: 'IN' },
    { name: 'Germany', countryCode: 'DE' },
    { name: 'Italy', countryCode: 'IT' }
  ];
  show: boolean;
  currentDate = moment(new Date()).format('YYYY-MM-DD');
  fieldLength = validationLength;
  gridOption: GridOption = {
    allrecords: true,
    sortDir: 'asc',
    sortField: 'name',
    filters: {
      status: 1
    }
  };
  filteredCountry: Observable<any[]>;
  activeIdString :any;
  submitted = false;
  userDetail: any;
  constructor(
    private translateService: TranslateService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private fb: FormBuilder,
    private commonService: CommonService,
    private toastr: ToastrService
  ) {
    this.initForm();
  }

  ngOnInit(): void {

    this.userDetail = JSON.parse(localStorage.getItem('userDetail'));
      this.userId = this.userDetail.id;

    this.titleService.setTitle(this.translateService.instant('PAGES.USER_PROFILE.PROFILE'));
    this.getDetail();
    // this.getUserList();

    // this.getRole();
  }

  private _filter(value: any): any[] {
    const filterValue = this._normalizeValue(value.name);
    return this.countryArr.filter(street => this._normalizeValue(street.name).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  // convenience getter for easy access to form fields
  // get f() {
  //   return this.userForm.controls;
  // }
  get f() {
   return this.changePasswordForm.controls;
  }


  /**
   * Form Init
   */
  initForm() {
    this.activeIdString = 1;
    this.userValidation();
    this.changePasswordValidation();
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string, type?: string, index?: number, name?: string): boolean {
    let control: any;

    if (this.activeIdString == 1) {
      control = this.userForm.controls[controlName];
    } else {
      control = this.changePasswordForm.controls[controlName];
    }

    if (!control) {
      return false;
    }
    let result: any;

    result =  control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }

  /** Get role list */
  getRole() {
    this.commonService.searchAll(API_ROUTES.ROLE, this.gridOption).subscribe((data: any) => {
      this.rolesArr = data.items;
    });
  }

  /** Get detail by id */
  getDetail() {
    this.commonService.getOne(this.userId, this.moduleNameServiceRoute).subscribe(response => {
      this.userForm.patchValue(response.result);
    });
  }

  /** Update data */
  update() {
    const controls = this.userForm.controls;

    // check form
    if (this.userForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    delete this.userForm.value.email;
    this.commonService.update(this.userForm.value, this.moduleNameServiceRoute, this.userId).subscribe(res => {
      if (res.status) {
        this.router.navigate(['/user/profile']).then(() => {
          this.toastr.success(res.message, 'Success!');
        });
      } else {
        if (res.message) {
          this.toastr.error(res.message, 'Error!');
        }
      }
    });
  }

  checkVatNumber(event: any) {
    const VatValue: any = {
      value: event.target.value,
      countrycode: this.userForm.controls.country.value
    };
    this.commonService.validateVAT(VatValue, this.moduleNameServiceRoute).subscribe((data: any) => {
      if (data.valid) {
        this.userForm.controls.vat_number.setErrors(null);
      } else {
        this.userForm.controls.vat_number.setErrors({ isInValid: true });
      }
    });
  }

  checkIBAN(event: any) {
    const Ibanvalue: any = {
      value: event.target.value
    };
    this.commonService.validateIBAN(Ibanvalue, this.moduleNameServiceRoute).subscribe((data: any) => {
      if (data.valid) {
        this.userForm.controls.iban_number.setErrors(null);
      } else {
        this.userForm.controls.iban_number.setErrors({ isInValid: true });
      }
    });
  }

  /** Get detail by id */
  getUserList() {
    this.commonService.getClientList(this.userId, this.moduleNameServiceRoute).subscribe(response => {
      this.clientArr = response.items;
      this.clientArrLength = this.clientArr.length;
    });
  }

    /** Delete for single item */
  deleteClient(id): void {
      const dialogRef = this.dialog.open(DeleteEntityDialogComponent, {
        data: {
          description: 'Are you sure to permanently delete this ' + this.moduleNameServiceRoute + '?',
          title: this.moduleNameServiceRoute + ' Delete',
          waitDesciption: this.moduleNameServiceRoute + ' is deleting...'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.commonService.deleteClient(id, this.moduleNameServiceRoute).subscribe((res: any) => {
            if (res.message === 'success' || res.status === 1) {
              this.toastr.success(res.message, 'Success!');
              this.getUserList();
            } else {
              this.toastr.error(res.message.id, 'Error!');
            }
          });
        }
      });
  }

  userValidation() {
    this.userForm = this.fb.group({
      first_name: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegexEnum.name),
          Validators.minLength(validationLength.nameMinLength),
          Validators.maxLength(validationLength.nameMaxLength)
        ])
      ],
      last_name: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegexEnum.name),
          Validators.minLength(validationLength.nameMinLength),
          Validators.maxLength(validationLength.nameMaxLength)
        ])
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
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]*$'),
            Validators.minLength(10),
            Validators.maxLength(15),
      ])],
      role_id: ['',
      Validators.compose([
        Validators.required,
      ])],
      status: [1, Validators.required]
    });
  }

  changePasswordValidation() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['',
        Validators.compose([
          Validators.required
        ])
      ],
      newPassword: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ])
      ],
      confirmPassword: ['',
        Validators.compose([
          Validators.required
        ])
      ],
    }, {
        validator: [MustMatch.MatchPassword, MustNotMatch.MatchNotPassword],
    });
  }

  onReset() {
    this.submitted = false;
    this.changePasswordForm.reset();
  }

  public aftertabChange($event: NgbNavChangeEvent) {
    this.activeIdString = $event.nextId;
  }

  checkPassword(event: any) {
    const password: any = {
      password: event.target.value,
      email: this.userEmail
    };
    this.commonService.checkPassword(password, this.moduleNameServiceRoute).subscribe((data: any) => {
      if (data.valid) {
        this.changePasswordForm.controls.current_password.setErrors(null);
      } else {
        this.changePasswordForm.controls.current_password.setErrors({ isInValid: true });
      }
    });
  }

   /** change Password */
   changePassword() {
    this.submitted = true;
    const userDetail = JSON.parse(localStorage.getItem('userDetail'));
    const controls = this.changePasswordForm.controls;
    // check form
    if (this.changePasswordForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    delete this.changePasswordForm.value.confirm_password;
    delete this.changePasswordForm.value.current_password;
    this.changePasswordForm.value['user_id'] = userDetail.id;

    this.commonService.changePassword(this.changePasswordForm.value, this.moduleNameServiceRoute).subscribe(res => {
      if (res.status) {
        this.router.navigate(['/user/profile']).then(() => {
          this.toastr.success(res.message, 'Success!');
          this.changePasswordForm.reset();
        });
      } else {
        if (res.message) {
          this.toastr.error(res.message, 'Error!');
        }
      }
    });
  }

   /**
   * Toggle Password
   */
  togglePassword() {
    this.show = !this.show;
  }

}
