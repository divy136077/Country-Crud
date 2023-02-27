import { HttpClient } from '@angular/common/http';
import { Component , ElementRef ,OnInit,ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api-services.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  @ViewChild('citytable',{static:false}) citytable!:ElementRef;
  cityData: any = null;
  // router: any;
  SearchForm:any;
  id: any;
  UpdateStatusForm: any;
  updateModal:boolean = false;

  constructor(
    private router : Router,
    private http: HttpClient,
    private serviceAPI: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
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
    const auth: any = localStorage.getItem("authToken")?.toString()
    this.serviceAPI.getAllCityData(auth).subscribe((res: any) => {
      if (res.length > 0) {
        this.cityData = res.reverse();
      } else {
        this.cityData = []
      }
    });
  }
  /**
 * file export 
 */
  exportToExcle(){
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.citytable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'citytable.xlsx');
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
      const auth: any = localStorage.getItem("authToken")?.toString()
    this.serviceAPI.updateSelectedCity(this.UpdateStatusForm.value.Status, selectedProducts,auth).subscribe((res: any) => {
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
    return this.cityData?.every((p: { checked: any }) => p.checked);
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
      const auth: any = localStorage.getItem("authToken")?.toString()
      this.serviceAPI.deleteCity(selectedProducts , auth).subscribe((res: any) => {
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
    const dd = localStorage.getItem("authToken")
    this.serviceAPI.getAllCityData(dd,this.SearchForm.value).subscribe((res: any) => {
      this.cityData = res.reverse();
      // console.log('rrt' ,this.SearchForm.value);
      
    });
  }

   resetForm(){
    this.SearchForm.reset({Name:"",Status:""})
    const dd = localStorage.getItem("authToken")
    this.serviceAPI.getAllCityData(dd).subscribe((res: any) => {
      this.cityData = res.reverse();
    });
  }



  userEdit(id:any){
    this.router.navigateByUrl('/auth/city/edit/' + id)
  }

  /**
   * delete only one data 
   * @param id any
   */
  
  userDelete(id: any) {
    if(confirm("Are you sure want to delete?")){
      const auth: any = localStorage.getItem("authToken")?.toString()
    this.serviceAPI.deleteByIdCity(id , auth).subscribe((res: any) => {
      this.cityData = this.cityData.filter((x: any) => x._id !== res._id)
      this.toastr.error('Data Deleted Successfully!');
    });
  }
  }

}
