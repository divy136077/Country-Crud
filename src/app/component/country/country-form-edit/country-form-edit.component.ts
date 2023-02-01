import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/api-services.service';

@Component({
  selector: 'app-country-form-edit',
  templateUrl: './country-form-edit.component.html',
  styleUrls: ['./country-form-edit.component.css']
})
export class CountryFormEditComponent {
  CountryForm: any;
  stateData: any;
  countryData: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }
  ngOnInit() {
    this.CountryForm = this.fb.group({
      Name: ['', Validators.required ],
      Code: ['', Validators.required],
      active: [false, Validators.required],
    });
    console.log(this.CountryForm.value);
    this.serviceAPI.getByIdCountry(this.route.snapshot.params['id'])
      .subscribe((res: any) => {
        this.CountryForm.patchValue({ ...res, active: res.IsActive });
        console.log("hi", res);
        // alert("Data sucessfully Updated")

      });

    this.serviceAPI.getAllStateData().subscribe((res: any) => {
      this.stateData = res;
    });
    this.serviceAPI.getAllData().subscribe((res: any) => {
      this.countryData = res;
    });

  }
  // get field() {
  //   return this.CityForm.controls;
  // }
  diag() {

    this.edit(this.route.snapshot.params['id'], {...this.CountryForm.value , IsActive: this.CountryForm.value.active });

  }
  edit(id: any, data: any) {


    this.serviceAPI.edit(id, data).subscribe({
      next: ((response: any) => {
        console.log(response);
        this.toastr.success('Data Updated sucessfully !');
        this.router.navigateByUrl('/country-form');
      }),
      error: ((error) => {
        this.toastr.error('Error in API');
        // this.router.navigateByUrl('/login');
      }
      ),
    }
    );
  }

}
