import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/api-services.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityCityComponent {
  cityData: any;
  // router: any;

  constructor(
    private router : Router,
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {

    
    this.serviceAPI.getAllCityData().subscribe((res: any) => {
      this.cityData = res;
    });


  }

  handleEdit(id:any){
    this.router.navigateByUrl('/city/edit/' + id)
  }

  
  handleDelete(id: any) {
    if(confirm("Are you sure want to delete?")){
    this.serviceAPI.deleteCity(id).subscribe((res: any) => {
      this.cityData = this.cityData.filter((x: any) => x._id !== res._id)
      this.toastr.error('Data Deleted Successfully!');
    });
  }
  }

  // cityEdit(element: any) {
  //   this.router.navigateByUrl('/city/edit/' + element._id);
  // }

}
