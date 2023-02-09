import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/api-services.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityCityComponent {
  cityData: any = null;
  // router: any;
  SearchForm:any;
  id: any;
  UpdateStatusForm: any;
  updateModal:boolean = false;
  constructor(
    private router : Router,
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
       this.SearchForm = this.fb.group({
        CityName: ['', Validators.required],
      Status: [''],
    });
    this.UpdateStatusForm = this.fb.group({
      Status: ['1'],
    });
    
    // this.serviceAPI.getAllCityData().subscribe((res: any) => {
    //   this.cityData = res.reverse();
    // });
    this.getAllCity();

  }

  /**
   * get city all data 
   */
  getAllCity(){
    this.serviceAPI.getAllCityData().subscribe((res: any) => {
      if (res.length > 0) {
        this.cityData = res.reverse();
      } else {
        this.cityData = []
      }
    });
  }
  /**
   * multipal select and update status using model
   */

  UpdateStatus(){
    this.updateModal = true
  }

  closeUpdateModal(){
    this.updateModal = false
    this.getAllCity();
  }


  UpdateAllStatus(){
    const selectedProducts = this.cityData
      .filter((product: { checked: any }) => product.checked)
      .map((p: { _id: any }) => p._id);

    this.serviceAPI.updateSelectedCity(this.UpdateStatusForm.value.Status, selectedProducts).subscribe((res: any) => {
      console.log('updated!');
      this.getAllCity();
      this.closeUpdateModal()
    });
  }
   /**
   * multipal select check box
   * @param ev any
   */

  checkAllCheckBox(ev: any) {
    this.cityData.forEach((x: { checked: any }) => (x.checked = ev.target.checked));
  }

  isAllCheckBoxChecked() {
    return this.cityData.every((p: { checked: any }) => p.checked);
  }

  deleteProducts(id: any): void {
    this.id = id;
  }
   /**
   * selected data delete 
   */

  deleteProduct() {
    if (confirm('Are u sure?')) {
      const selectedProducts = this.cityData
        .filter((product: { checked: any }) => product.checked)
        .map((p: { _id: any }) => p._id);
      console.log('sd', selectedProducts);

      this.serviceAPI.deleteCity(selectedProducts).subscribe((res: any) => {
        console.log('deleted!');
        this.getAllCity();
      });
    }
  }

  // changeSelectedStatus(status:any){
  //   const selectedProducts = this.cityData
  //     .filter((product: { checked: any }) => product.checked)
  //     .map((p: { _id: any }) => p._id);

  //   this.serviceAPI.updateSelectedCity(status,selectedProducts).subscribe((res: any) => {
  //     console.log('updated!');
  //     this.getAllCity();
  //   });
  // }
 /**
   * search function and reset data 
   */
  search(){
    this.serviceAPI.getAllCityData(this.SearchForm.value).subscribe((res: any) => {
      this.cityData = res.reverse();
      // console.log('rrt' ,this.SearchForm.value);
      
    });
  }

   resetForm(){
    this.SearchForm.reset({Name:"",Status:""})
    this.serviceAPI.getAllCityData().subscribe((res: any) => {
      this.cityData = res.reverse();
    });
  }



  userEdit(id:any){
    this.router.navigateByUrl('/city/edit/' + id)
  }

  /**
   * delete only one data 
   * @param id any
   */
  
  userDelete(id: any) {
    if(confirm("Are you sure want to delete?")){
    this.serviceAPI.deleteByIdCity(id).subscribe((res: any) => {
      this.cityData = this.cityData.filter((x: any) => x._id !== res._id)
      this.toastr.error('Data Deleted Successfully!');
    });
  }
  }

  // cityEdit(element: any) {
  //   this.router.navigateByUrl('/city/edit/' + element._id);
  // }

}
