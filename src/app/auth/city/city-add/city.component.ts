import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api-services.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent {
  isSubmitting: boolean = false;
  submitted: boolean = false;
  cityForm: any;
  EditcityForm: any;
  error!: string;
  stateData: any = [];
  countryData: any = [];
  editModalId: any;
  modal: boolean = false;
  cityData: any;
  isEdit: boolean = false;
  errorMessage: any;
  cities: any;
  states: any;

  constructor(
    private http: HttpClient,
    private serviceAPI: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cityForm = this.fb.group({
      CountryName: ['', Validators.required],
      StateName: ['', Validators.required],
      CityName: ['', Validators.required],
      active: ['1', Validators.required],
    });

    if (!!this.route.snapshot.params['id']) {
      this.isEdit = true
      const auth: any = localStorage.getItem("authToken")?.toString()
      this.serviceAPI.getByIdCity(this.route.snapshot.params['id'],auth)

        .subscribe((res: any) => {
          this.cityForm.patchValue({ ...res, active: res.Status });
          this.getStateData({ target: { value: this.cityForm.value.CountryName } })
        });
    }
     /**
      * dropdown menu for country value 
      */
     const dd = localStorage.getItem("authToken")
    this.serviceAPI.getAllData(dd).subscribe((res: any) => {
      this.countryData = res;
    });

  }
/**
 * dropdown menu for state value
 * @param event any
 */
  getStateData(event: any) {
    const dd :any = localStorage.getItem('authToken')
    this.serviceAPI.getAllStateData(dd, null,event.target.value).subscribe((res: any) => {
      this.stateData = res;
    });
  }

   /**
   * form validation 
   */
  get field() {
    return this.cityForm.controls;
  }

  /**
   * edit data  method
   * @param id any
   * @param data any
   */

  edit(id: any, data: any) {
    this.submitted = true;
    if (this.cityForm.invalid) {
      return;
    }
    const auth: any = localStorage.getItem("authToken")?.toString()
    this.serviceAPI.editCity(id, data , auth).subscribe({
      next: (response: any) => {
        this.toastr.success('Data Updated sucessfully !');
        this.router.navigateByUrl('/auth/city');
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
        ...this.cityForm.value,
        Status: this.cityForm.value.active,
      });
    } else {

      this.submitted = true;
      if (this.cityForm.invalid) {
        return;
      }
      this.isSubmitting = true;
      const data = {
        CountryName: this.cityForm.value.CountryName,
        StateName: this.cityForm.value.StateName,
        CityName: this.cityForm.value.CityName,
        Status: this.cityForm.value.active,
      };
      const auth: any = localStorage.getItem("authToken")?.toString()
      this.serviceAPI.addCity(data , auth).subscribe((res) => {
        {
          next: this.toastr.success('Data Added Successfully!');
          this.isSubmitting = false;
          this.router.navigateByUrl('/auth/city');
        }
        error: () => { 
          this.isSubmitting = false;
        }
      },()=>{
        this.isSubmitting = false
      }
      );
    }
  }
}
