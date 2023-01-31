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
  isEdit: boolean = false;
  errorMessage: any;
  router: any;
 

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
    
    this.serviceAPI.getAllCityData().subscribe((res: any) => {
      this.cityData = res;
    },
    // (error)=>{
      // this.errorMessage=error;
      // console.log(error);
    // }
    
    );
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

  // cancelEdit(){
  //   this.editModalId = null
  //   this.isEdit = false
  //   this.CityForm.reset()
  // }
  
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



  handleDelete(id: any) {
    if(confirm("Are you sure want to delete?")){
    this.serviceAPI.deleteCity(id).subscribe((res: any) => {
      this.cityData = this.cityData.filter((x: any) => x._id !== res._id)
      this.toastr.error('Data Deleted Successfully!');
    });
  }
  }

  

  cityEdit(element: any) {
    this.router.navigateByUrl('/city/edit/' + element._id);
  }
}
