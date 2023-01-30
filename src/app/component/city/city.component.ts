import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/api-services.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent {

  isSubmitting: boolean = false;
  submitted: boolean = false;
  CityForm: any;
  EditCityForm : any;
  error!: string;
  stateData: any = [];
  countryData:any = [];
  editModalId:any;
  modal:boolean = false;
  cityData: any;
 

  constructor(
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.CityForm = this.fb.group({
      CountryName: ['', Validators.required],
      StateName: ['', Validators.required],
      CityName: ['', Validators.required],
      active: [false, Validators.required],
    });
    this.EditCityForm = this.fb.group({
      CountryName: ['', Validators.required],
      StateName: ['', Validators.required],
      CityName: ['', Validators.required],
      active: [false, Validators.required],
    });
    
    this.serviceAPI.getAllCityData().subscribe((res: any) => {
      this.cityData = res;
    });
    this.serviceAPI.getAllStateData().subscribe((res: any) => {
      this.stateData = res;
    });
    this.serviceAPI.getAllData().subscribe((res: any) => {
      this.countryData = res;
    });

  }

  get field() {
    return this.CityForm.controls;
  }
  
  handleAddData() {
    
    this.submitted = true;
    if (this.CityForm.invalid) {
      return;
    }
    // this.error = '';

    this.isSubmitting = true;
    const data = {
      CountryName: this.CityForm.value.CountryName,
      StateName: this.CityForm.value.StateName,
      CityName: this.CityForm.value.CityName,
      IsActive: this.CityForm.value.active,
    };
    this.serviceAPI.addCity(data).subscribe((res) => {
      this.toastr.success('Data Added Successfully!');
      this.cityData.push(res);
      this.isSubmitting = false;
    });
  }

  edit(id: any, data: any) {
    console.log(id, data);
    this.EditCityForm.patchValue(data);
    this.editModalId = id
    this.modal = true;
  }

  handleEdit() {
    const { CountryName, StateName,CityName, active } = this.EditCityForm.value;
    this.serviceAPI.editCity(this.editModalId, { CountryName, StateName,CityName, IsActive: active  }).subscribe((res: any) => {
      this.toastr.success('Data Updated Successfully!');
      this.cityData[this.cityData.findIndex((x: any) => x._id === res._id)] = res
    });
    this.closeModal()
  }

  handleDelete(id: any) {
    this.serviceAPI.deleteCity(id).subscribe((res: any) => {
      this.cityData = this.cityData.filter((x: any) => x._id !== res._id)
      this.toastr.error('Data Deleted Successfully!');
    });
  }

  closeModal() {
    this.editModalId = null
    this.modal = false;
  }
}
