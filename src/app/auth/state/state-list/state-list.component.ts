import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api-services.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {
  @ViewChild('statetable',{static:false}) statetable!:ElementRef;
  stateData: any = null;
  SearchForm: any;
  id: any;
  UpdateStatusForm: any;
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
      StateName: ['', Validators.required],
      Status: [''],
    });
    this.UpdateStatusForm = this.fb.group({
      Status: ['1'],
    });


    this.getAll();
  }
   /**
   * find all data for state component 
   */
   getAll() {
    const dd = localStorage.getItem("authToken")
    this.serviceAPI.getAllStateData(dd,null,null).subscribe((res: any) => {
      if (res.length > 0) {
        this.stateData = res.reverse();
      } else {
        this.stateData = []
      }
    });
  }
  /**
   * file export
   */
  exportToExcle(){
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.statetable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'statetable.xlsx');
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
    const selectedProducts = this.stateData
      .filter((product: { checked: any }) => product.checked)
      .map((p: { _id: any }) => p._id);
      const auth: any = localStorage.getItem("authToken")?.toString()
    this.serviceAPI.updateSelectedState(this.UpdateStatusForm.value.Status, selectedProducts, auth).subscribe((res: any) => {
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
    this.stateData.forEach((x: { checked: any }) => (x.checked = ev.target.checked));
  }

  isAllCheckBoxChecked() {
    return this.stateData?.every((p: { checked: any }) => p.checked);
  }

  deleteProducts(id: any): void {
    this.id = id;
  }
  /**
    * selected data delete 
    */
  deleteProduct() {
    if (confirm('Are u sure?')) {
      const selectedProducts = this.stateData
        .filter((product: { checked: any }) => product.checked)
        .map((p: { _id: any }) => p._id);
      console.log('sd', selectedProducts);
      const auth: any = localStorage.getItem("authToken")?.toString()
      this.serviceAPI.deleteState(selectedProducts, auth).subscribe((res: any) => {
        console.log('deleted!');
        this.getAll();
      });
    }
  }

  // changeSelectedStatus(status:any){
  //   const selectedProducts = this.stateData
  //     .filter((product: { checked: any }) => product.checked)
  //     .map((p: { _id: any }) => p._id);

  //   this.serviceAPI.updateSelectedState(status,selectedProducts).subscribe((res: any) => {
  //     console.log('updated!');
  //     this.getAll();
  //   });
  // }






  /**
   * search function and reset form
   */

  search() {
    const dd = localStorage.getItem("authToken")
    this.serviceAPI.getAllStateData(dd,this.SearchForm.value).subscribe((res: any) => {
      this.stateData = res.reverse();
      console.log(this.SearchForm.value);

    });
  }

  resetForm() {
    this.SearchForm.reset({ StateName: "", Status: "" })
    const dd = localStorage.getItem("authToken")
    this.serviceAPI.getAllStateData(dd).subscribe((res: any) => {
      this.stateData = res.reverse();
    });
  }


  userEdit(id: any) {
    this.router.navigateByUrl('/auth/state/edit/' + id)
  }
  /**
   * delete only one data 
   * @param id any 
   */
  userDelete(id: any) {
    if (confirm("Are you sure want to delete?")) {
      const auth: any = localStorage.getItem("authToken")?.toString()
      this.serviceAPI.deleteByIdState(id , auth).subscribe((res: any) => {
        this.stateData = this.stateData.filter((x: any) => x._id !== res._id)
        this.toastr.error('Data Deleted Successfully!');
      });
    }
  }

}
