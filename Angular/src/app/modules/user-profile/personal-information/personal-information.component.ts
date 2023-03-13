import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { API_ROUTES } from 'src/app/constant/constant';
import { RegexEnum } from 'src/app/constant/regex';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { AuthService, UserModel } from '../../auth';
import { PersonalInfoListModel } from './model/personal-information.model';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: UserModel;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  avatarPic = 'none';
  isLoading$: Observable<boolean>;
  files: any;
  filesName: any = [];
  isImageExist: boolean = false;
  profilePic: any = null;
  removedPicture: boolean;
  oldFileName: any;
  moduleNameServiceRoute = API_ROUTES.USER;
  userDetails: PersonalInfoListModel;
  image: any;
  imageData : any;
  
  constructor(private commonService: CommonService, private userService: AuthService, private fb: FormBuilder, private authService: AuthService, private cdr: ChangeDetectorRef, private toastr: ToastrService) {
    this.isLoading$ = this.userService.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    const sb = this.userService.currentUserSubject.asObservable().pipe(
      first(user => !!user)
    ).subscribe(user => {
      this.user = Object.assign({}, user);
      this.firstUserState = Object.assign({}, user);
      this.oldFileName = this.user.profile_image;
      if (this.user.profile_image) {
        this.isImageExist = true;
      }
      this.loadForm();
    });
    this.subscriptions.push(sb);
    this.getUser();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      profile_image: [this.user.profile_image],
      first_name: [this.user.first_name],
      last_name: [this.user.last_name],
      phone: [this.user.phone],
      email: [this.user.email]
    });
  }

  getUser() {
    this.commonService.getOne(this.user.id, this.moduleNameServiceRoute).subscribe(response => {
      this.userDetails = response.result;
      this.image = this.userDetails.thumbnail_photo_base64.data;
      var enc = new TextDecoder("utf-8");
      var arr = new Uint8Array(this.image);
      this.imageData = enc.decode(arr);
    });
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.formGroup.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  // save() {
  //   this.formGroup.markAllAsTouched();
  //   if (!this.formGroup.valid) {
  //     return;
  //   }
  //   if (this.removedPicture) {
  //     this.formGroup.value.profile_image = null;
  //   }
  //   const formValues = this.formGroup.value;
  //   formValues.oldFileName = this.oldFileName;
  //   var myUserData = new FormData();
  //   if (this.files) {
  //     myUserData.append('files', this.files);
  //   }
  //   myUserData.append("data", JSON.stringify(formValues));
  //   this.authService.update(this.user.id, myUserData).subscribe(res => {
  //     if (res) {
  //       this.toastr.success(res.message, 'Success!');
  //       const obj: any = {
  //         name: res.result.name,
  //         first_name: res.result.first_name,
  //         last_name: res.result.last_name,
  //         id: res.result.id,
  //         email: res.result.email,
  //         phone: res.result.phone,
  //         profile_image: res.result.profile_image
  //       };
  //       this.ngOnInit();
  //     }
  //   });

  // }

  // cancel() {
  //   this.user = Object.assign({}, this.firstUserState);
  //   this.loadForm();
  // }

  getPic() {
    if (this.profilePic) {
      return `url('${this.profilePic}`;
    } else if (this.user.profile_image == null && this.profilePic == null) {
      return 'none';
    } else {
      return `url('http://localhost:3000/public/profile_images/${this.user.profile_image}')`;
    }
  }

  deletePic() {
    this.files = [];
    this.user.profile_image = null;
    this.profilePic = null;
    this.removedPicture = true;
    this.isImageExist = false;
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

  OnLoadImage(event) {
    this.user.profile_image = null;
    let myFileArray = event.target.files;
    if (
      myFileArray[0].size < 5242880 && (myFileArray[0].type === "application/pdf" ||
        myFileArray[0].type === "image/png" ||
        myFileArray[0].type === "image/jpg" ||
        myFileArray[0].type === "image/jpeg")
    ) {
      this.files = myFileArray[0];
      let reader = new FileReader();
      reader.readAsDataURL(myFileArray[0]);
      reader.onload = (e: any) => {
        this.filesName = [{
          name: myFileArray[0].name,
          size: myFileArray[0].size,
          url: e.target.result,
        }];
        // this.user.profile_image = e.target.result;
        this.profilePic = e.target.result;
        this.removedPicture = false;
        this.isImageExist = true;
        this.cdr.detectChanges();
        this.getPic();
      };
    } else {
      this.toastr.error("Invalid Image", "Errore");
    }
  }

}
