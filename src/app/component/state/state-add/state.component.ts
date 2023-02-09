import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/api-services.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
})
export class StateComponent {
  isSubmitting: boolean = false;
  submitted: boolean = false;
  stateForm: any;
  error!: string;
  stateData: any = [];
  countryData: any = [];
  editModalId: any;
  modal: boolean = false;
  isEdit: boolean = false;


  constructor(
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.stateForm = this.fb.group({
      CountryName: ['', Validators.required],
      StateName: ['', Validators.required],
      active: ['1', Validators.required],
    });

    if (!!this.route.snapshot.params['id']) {
      this.isEdit = true
      this.serviceAPI
        .getByIdState(this.route.snapshot.params['id'])
        .subscribe((res: any) => {
          this.stateForm.patchValue({ ...res, active: res.Status });
        });
    }

    this.serviceAPI.getAllData().subscribe((res: any) => {
      this.countryData = res;
    });
  }
  /**
   * form validation 
   */
  get field() {
    return this.stateForm.controls;
  }
  /**
   * data edit method 
   * @param id any
   * @param data any
   */

  edit(id: any, data: any) {
    this.submitted = true;
    if (this.stateForm.invalid) {
      return;
    }
    this.serviceAPI.editState(id, data).subscribe({
      next: (response: any) => {
        this.toastr.success('Data Updated sucessfully !');
        this.router.navigateByUrl('/state');
      },
      error: (error) => {
        // this.toastr.error('Error in API');
      },
    });
  }
  /**
   * add data 
   */
  addData() {
    if (!!this.route.snapshot.params['id']) {
      this.edit(this.route.snapshot.params['id'], {
        ...this.stateForm.value,
        Status: this.stateForm.value.active,
      });
    }
    else {
      this.submitted = true;
      if (this.stateForm.invalid) {
        return;
      }
      this.isSubmitting = true;
      const data = {
        CountryName: this.stateForm.value.CountryName,
        StateName: this.stateForm.value.StateName,
        Status: this.stateForm.value.active,
      };
      this.serviceAPI.addState(data).subscribe((res) => {
        {
          next: this.toastr.success('Data Added Successfully!');
          this.isSubmitting = false;
          this.router.navigateByUrl('/state');
        }
        error: () => {
          this.isSubmitting = false;
        }
      }, () => {
        this.isSubmitting = false
      }
      );
      // }
    }


  }
}