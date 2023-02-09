import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/api-services.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  data: any = null;
  SearchForm: any;
  id: any;
  updateModal: boolean = false;
  UpdateStatusForm: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.SearchForm = this.fb.group({
      Name: ['', Validators.required],
      Status: ['1'],
    });
    this.UpdateStatusForm = this.fb.group({
      Status: ['1'],
    });

    // this.serviceAPI.getAllUserData().subscribe((res: any) => {
    //   this.data = res.reverse();
    // });
    this.getAll();
  }
  /**
   * get all data for user component
   */
  getAll() {
    this.serviceAPI.getAllUserData().subscribe((res: any) => {
      if (res.length > 0) {
        this.data = res.reverse();
      } else {
        this.data = []
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
    const selectedProducts = this.data
      .filter((product: { checked: any }) => product.checked)
      .map((p: { _id: any }) => p._id);

    this.serviceAPI.updateSelectedUser(this.UpdateStatusForm.value.Status, selectedProducts).subscribe((res: any) => {
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
    return this.data.every((p: { checked: any }) => p.checked);
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

      this.serviceAPI.deleteUser(selectedProducts).subscribe((res: any) => {
        console.log('deleted!');
        this.getAll();
      });
    }
  }

  // changeSelectedStatus(status:any){
  //   const selectedProducts = this.data
  //     .filter((product: { checked: any }) => product.checked)
  //     .map((p: { _id: any }) => p._id);

  //   this.serviceAPI.updateSelectedUser(status,selectedProducts).subscribe((res: any) => {
  //     console.log('updated!');
  //     this.getAll();
  //   });
  // }


  /**
   * search function and reset form 
   */
  search() {
    this.serviceAPI.getAllUserData(this.SearchForm.value).subscribe((res: any) => {
      this.data = res.reverse();
    });
  }

  resetForm() {
    this.SearchForm.reset({ Name: "", Status: "" })
    this.serviceAPI.getAllUserData().subscribe((res: any) => {
      this.data = res.reverse();
    });
  }



  userEdit(id: any) {
    this.router.navigateByUrl('/user/edit/' + id)
  }

  /**
   * delete only one data
   * @param id  any
   */

  userDelete(id: any) {
    if (confirm("Are you sure want to delete?")) {
      this.serviceAPI.deleteByIdUser(id).subscribe((res: any) => {
        this.data = this.data.filter((x: any) => x._id !== res._id)
        this.toastr.error('Data Deleted Successfully!');
      });
    }
  }


}
