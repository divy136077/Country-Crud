import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../.././services/api-services.service';
import * as xlsx from 'xlsx';
import { filter } from 'rxjs';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  @ViewChild('countrytable', { static: false }) countrytable!: ElementRef;
  data: any = null;
  SearchForm: any;
  UpdateStatusForm: any;
  checked?: boolean;
  products: any = [];
  getAllData: any;
  clss: string | undefined;
  msg: string | undefined;
  id: any;
  updateModal: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private serviceAPI: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.SearchForm = this.fb.group({
      Name: ['', Validators.required],
      Status: [''],
    });
    this.UpdateStatusForm = this.fb.group({
      Status: ['1'],
    });

    this.getAll();

  }
  /**
  * getAll() --> all data 
  */

  getAll() {
    const auth: any = localStorage.getItem("authToken")
    this.serviceAPI.getAllData(auth).subscribe((res: any) => {
      if (res.length > 0) {
        this.data = res.reverse();
      } else {
        this.data = []
      }
    });
  }
  /**
   * file export 
   */
  exportToExcle() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.countrytable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'countrytable.xlsx');
  }


  /**
   * multipal select and update status using model
   */
  UpdateStatus() {
    this.updateModal = true
  }

  closeUpdateModal() {
    this.updateModal = false
    this.getAll();
  }

  UpdateAllStatus() {
    const selectedProducts = this.data
      .filter((product: { checked: any }) => product.checked)
      .map((p: { _id: any }) => p._id);
    const auth: any = localStorage.getItem("authToken")?.toString()
    this.serviceAPI.updateSelected(this.UpdateStatusForm.value.Status, selectedProducts, auth).subscribe((res: any) => {
      console.log('updated!');
      this.getAll();
      this.closeUpdateModal()
    });
  }

  /**
   * multipal select check box
   * @param ev any
   */
  checkAllCheckBox(ev: any) {
    this.data.forEach((x: { checked: any }) => (x.checked = ev.target.checked));
  }

  isAllCheckBoxChecked() {
    return this.data?.every((p: { checked: any }) => p.checked);
  }

  deleteProducts(id: any): void {
    this.id = id;
  }

  /**
   * selected data delete 
   */
  deleteProduct() {
    if (confirm('Are u sure?')) {
      const selectedProducts = this.data
        .filter((product: { checked: any }) => product.checked)
        .map((p: { _id: any }) => p._id);
      console.log('sd', selectedProducts);
      const auth: any = localStorage.getItem("authToken")?.toString()
      this.serviceAPI.delete(selectedProducts, auth).subscribe((res: any) => {
        console.log('deleted!');
        this.getAll();
      });
    }
  }

  // changeSelectedStatus(status:any){
  //   const selectedProducts = this.data
  //     .filter((product: { checked: any }) => product.checked)
  //     .map((p: { _id: any }) => p._id);

  //   this.serviceAPI.updateSelected(status,selectedProducts).subscribe((res: any) => {
  //     console.log('updated!');
  //     this.getAll();
  //   });
  // }

  /**
   * search function and reset form
   */
  search() {
    // console.log(this.SearchForm.value, 'dddd');
    const dd = localStorage.getItem("authToken")
    this.serviceAPI.getAllData(dd,this.SearchForm.value).subscribe((res: any) => {
      this.data = res.reverse();
    });
  }

  resetForm() {
    this.SearchForm.reset({ Name: "", Status: "" });
    const dd = localStorage.getItem("authToken")
    this.serviceAPI.getAllData(dd).subscribe((res: any) => {
      this.data = res.reverse();
    });
  }


  userEdit(id: any) {
    this.router.navigateByUrl('/auth/country/edit/' + id);
  }

  /**
   * delete only one data 
   * @param id any
   */
  userDelete(id: any) {
    if (confirm('Are you sure want to delete?')) {
      const auth: any = localStorage.getItem("authToken")?.toString()
      this.serviceAPI.deleteById(id, auth).subscribe((res: any) => {
        this.data = this.data.filter((x: any) => x._id !== res._id);
        this.toastr.error('Data Deleted Successfully!');
      });
    }
  }

}
