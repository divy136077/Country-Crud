import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/api-services.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent {
  isSubmitting: boolean = false;
  submitted: boolean = false;
  CityForm: any;
  EditCityForm: any;
  error!: string;
  stateData: any = [];
  countryData: any = [];
  editModalId: any;
  modal: boolean = false;
  cityData: any;
  isEdit: boolean = false;
  errorMessage: any;
  router: any;
  
  cities: any;
  states: any;

  constructor(
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.CityForm = this.fb.group({
      CountryName: ['', Validators.required],
      StateName: ['', Validators.required],
      CityName: ['', Validators.required],
      active: [false, Validators.required],
    });

    if (!!this.route.snapshot.params['id']) {
      this.serviceAPI
        .getByIdCity(this.route.snapshot.params['id'])
        .subscribe((res: any) => {
          this.CityForm.patchValue({ ...res, active: res.IsActive });
          this.getStateData({target:{value:this.CityForm.value.CountryName}})
        });
    }

    // this.serviceAPI.getAllCityData().subscribe((res: any) => {
    //   this.cityData = res;
    // }
    // );
   
    this.serviceAPI.getAllData().subscribe((res: any) => {
      this.countryData = res;
    });
   
  }

  getStateData(event:any){
    this.serviceAPI.getAllStateData(event.target.value).subscribe((res: any) => {
      this.stateData = res;
    });
  }
  // selectedCountry: String = "--Choose Country--";
 
  // changeCountry(country: any) { 
  //   // console.log("ryr", country.target.value );
	// 	this.states = this.countryData.find((cou: any) => cou.Name == country.target.value ); 
  //   console.log("hii",this.states);
    
	// }

  // changeState(state: any) { 
  //   		this.cities = this.countryData.find((cou: any) => cou.Name == this.selectedCountry).find((stat: any) => stat.Name == state.target.value); 
	// }

  get field() {
    return this.CityForm.controls;
  }

  // cancelEdit(){
  //   this.editModalId = null
  //   this.isEdit = false
  //   this.CityForm.reset()
  // }


  edit(id: any, data: any) {
    this.submitted = true;
    if (this.CityForm.invalid) {
      return;
    }
    this.serviceAPI.editCity(id, data).subscribe({
      next: (response: any) => {
        console.log(response);
        this.toastr.success('Data Updated sucessfully !');
        this.router.navigateByUrl('/city');
      },
      error: (error) => {
        this.toastr.error('Error in API');
      },
    });
  }

  handleAddData() {

    if (!!this.route.snapshot.params['id']) {
      this.edit(this.route.snapshot.params['id'], {
        ...this.CityForm.value,
        IsActive: this.CityForm.value.active,
      });
    } else {

      this.submitted = true;
      if (this.CityForm.invalid) {
        return;
      }
      this.isSubmitting = true;
      const data = {
        CountryName: this.CityForm.value.CountryName,
        StateName: this.CityForm.value.StateName,
        CityName: this.CityForm.value.CityName,
        IsActive: this.CityForm.value.active,
      };
      this.serviceAPI.addCity(data).subscribe((res) => {
        this.toastr.success('Data Added Successfully!');
        // this.cityData.push(res);
        this.isSubmitting = false;
        console.log(res);
      });
    }

  }

  // cityEdit(element: any) {
  //   this.router.navigateByUrl('/city' + element._id);
  // }
}
