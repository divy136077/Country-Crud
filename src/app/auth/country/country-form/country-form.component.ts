import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { ApiService } from './../../../services/api-services.service';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css'],
})
export class CountryFormComponent {
  data: any = [];
  selectedAll: any;
  countryForm!: FormGroup;
  EditcountryForm!: FormGroup;
  isSubmitting: boolean = false;
  modal: boolean = false;
  editModalId: any;
  submitted: boolean | undefined;
  error: string | undefined;
  isEdit: boolean = false;


  constructor(
    private http: HttpClient,
    private serviceAPI: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.countryForm = this.fb.group({
      Name: ['', Validators.required],
      Code: ['', Validators.required],
      active: ['1', Validators.required],
    });

    if (!!this.route.snapshot.params['id']) {
      this.isEdit = true
      const auth: any = localStorage.getItem("authToken")?.toString()
      this.serviceAPI.getByIdCountry(this.route.snapshot.params['id'], auth)
        .subscribe((res: any) => {
          this.countryForm.patchValue({ ...res, active: res.Status });
        });
    }


  }
  /**
   * form validation 
   */
  get field() { return this.countryForm.controls; }


  /**
   * data edit method 
   * @param id any
   * @param data any
   */

  edit(id: any, data: any) {
    this.submitted = true;
    if (this.countryForm.invalid) {
      return;
    }
    const auth: any = localStorage.getItem("authToken")?.toString()
    this.serviceAPI.edit(id, { ...data, id }, auth).subscribe({
      next: (response: any) => {
        this.toastr.success('Data Updated sucessfully !');
        this.router.navigateByUrl('/auth/country');
      },
      error: (error) => {
        // this.toastr.error('Error in API');
      },
    });
  }

  /**
   * add country data
   */

  addData() {
    if (!!this.route.snapshot.params['id']) {
      this.edit(this.route.snapshot.params['id'], {
        ...this.countryForm.value,
        Status: this.countryForm.value.active,
      });
    } else {
      this.submitted = true;
      if (this.countryForm.invalid) {
        return;
      }


      this.isSubmitting = true
      const data = {
        Name: this.countryForm.value.Name,
        Code: this.countryForm.value.Code,
        Status: this.countryForm.value.active,
      };
      const auth: any = localStorage.getItem("authToken")?.toString()
      this.serviceAPI.add(data , auth).subscribe((res) => {
        {
          next: this.toastr.success('Data Added Successfully!');
          this.isSubmitting = false;
          this.router.navigateByUrl('/auth/country');
        }
        () => {
          this.isSubmitting = false;
        }
      }, () => {
        this.isSubmitting = false
      }
      );
    }
  }

}
