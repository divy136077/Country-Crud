import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/api-services.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent {
  UserForm: any;
  submitted!: boolean;
  countryForm: any;
  isSubmitting!: boolean;
  isEdit: any;
  userData: any;
  data: any;
  imageSrc: any;
  Userform: any;
  // check: boolean = true;

  constructor(
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.UserForm = this.fb.group({
      Name: ['', Validators.required],
      Email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      Password: ['', Validators.required],
      Number: ['', Validators.required],
      Image: [''],
      Dob: ['', Validators.required],
      Status: ['1'],
      IsAdmin:[''],
      file: [''],
    });

    if (!!this.route.snapshot.params['id']) {
      this.isEdit = true;
      this.serviceAPI
        .getByIdUser(this.route.snapshot.params['id'])
        .subscribe((res: any) => {
          this.UserForm.patchValue({ ...res, Image: '' });
          // this.imageSrc = '../../../assets/image/' + res.Image;
          this.imageSrc = environment.imageUrl + res.Image;


        });
    }

    this.serviceAPI.getAllUserData().subscribe((res: any) => {
      this.userData = res;
    });
  }
  /**
   * preview image
   * @param event any
   */

  readURL(event: any): void {
    if (event.target.files && event.target.files[0] && event.target.files[0].size < 5000000) {

      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    } else if (event.target.files[0].size >= 5000000) {
      this.UserForm.patchValue({ ...this.UserForm.value, Image: '' });
      alert("File is too big!");
    }
  }
  /**
   * delete preview image 
   */

  delete() {
    this.imageSrc = null;

    this.UserForm.patchValue({ Image: '' });
    // this.UserForm.value.Image.reset()
  }

  /**
   * validation for calender , not a show future data in calender
   * @returns string
   */
  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
  /**
   * form validation 
   */
  get field() {
    return this.UserForm.controls;
  }

  /**
   * data edit method
   * @param id any
   * @param data any 
   */

  edit(id: any, data: any) {
    this.submitted = true;
    if (this.UserForm.invalid) {
      return;
    }
    this.serviceAPI.editUser(id, data).subscribe({
      next: (response: any) => {
        this.toastr.success('Data Updated sucessfully !');
        this.router.navigateByUrl('/user');
      },
      error: (error) => {
        // this.toastr.error('Error in API');
      },
    });
  }
  /**
   * select image file 
   * @param e files
   */
  onChange(e: any) {
    const file = e.target.files[0];
    this.UserForm.patchValue({ file: file });
  }

  /**
   * add user data
   */

  addData() {
    if (!!this.route.snapshot.params['id']) {
      const formdata = new FormData();

      Object.entries(this.UserForm.value).forEach((entry: any) => {
        const [key, value] = entry;

        if (key != 'Image' && key != 'file') {
          formdata.append(key, value);
        }
      });

      formdata.append('Image', this.UserForm.value.file);
      this.edit(this.route.snapshot.params['id'], formdata);
    } else {
      this.submitted = true;
      if (this.UserForm.invalid) {
        return;
      }
      // this.error = ''
      const formdata = new FormData();

      Object.entries(this.UserForm.value).forEach((entry: any) => {
        const [key, value] = entry;

        if (key != 'Image' && key != 'file') {
          formdata.append(key, value);
        }
      });

      formdata.append('Image', this.UserForm.value.file);

      this.isSubmitting = true;
      // const data = {
      //   Name: this.UserForm.value.Name,
      //   Email: this.UserForm.value.Email,
      //   Number: this.UserForm.value.Number,
      //   Image: this.UserForm.value.Image,
      //   Dob: this.UserForm.value.Dob,
      //   IsActive: this.UserForm.value.IsActive,
      // };
      this.serviceAPI.addUser(formdata).subscribe(
        (res) => {
          {
            next: this.toastr.success('Data Added Successfully!');
            this.isSubmitting = false;
            this.router.navigateByUrl('/user');
          }
          error: () => {
            this.isSubmitting = false;
          }
        }, () => {
          this.isSubmitting = false
        }
      );
    }
  }
}
