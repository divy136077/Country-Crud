import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/api-services.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateMainComponent {
  stateData: any = null;
  SearchForm: any;
  id: any;
  UpdateStatusForm: any;
  updateModal: boolean = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private serviceAPI: ServiceService,
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
    this.serviceAPI.getAllStateData().subscribe((res: any) => {
      if (res.length > 0) {
        this.stateData = res.reverse();
      } else {
        this.stateData = []
      }
    });
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

    this.serviceAPI.updateSelectedState(this.UpdateStatusForm.value.Status, selectedProducts).subscribe((res: any) => {
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
    return this.stateData.every((p: { checked: any }) => p.checked);
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

      this.serviceAPI.deleteState(selectedProducts).subscribe((res: any) => {
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
    this.serviceAPI.getAllStateData(this.SearchForm.value).subscribe((res: any) => {
      this.stateData = res.reverse();
      console.log(this.SearchForm.value);

    });
  }

  resetForm() {
    this.SearchForm.reset({ StateName: "", Status: "" })
    this.serviceAPI.getAllStateData().subscribe((res: any) => {
      this.stateData = res.reverse();
    });
  }


  userEdit(id: any) {
    this.router.navigateByUrl('/state/edit/' + id)
  }
  /**
   * delete only one data 
   * @param id any 
   */
  userDelete(id: any) {
    if (confirm("Are you sure want to delete?")) {
      this.serviceAPI.deleteByIdState(id).subscribe((res: any) => {
        this.stateData = this.stateData.filter((x: any) => x._id !== res._id)
        this.toastr.error('Data Deleted Successfully!');
      });
    }
  }
}
