import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { ServiceService } from 'src/app/api-services.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @ViewChild('usertable', { static: false }) usertable!: ElementRef;
  data: any = null;
  SearchForm: any;
  id: any;
  updateModal: boolean = false;
  menuModal: boolean = false;
  UpdateStatusForm: any;
  MenuMappingData: Array<any>= [];
  menuMappingList:Array<any>=[];
  // usertable: any;
  arr: any = [];
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
    this.exportToExcle();
  }
  /**
   * get all data for user component
   */
  getAll() {
    const auth: any = localStorage.getItem("authToken")?.toString()

    this.serviceAPI.getAllUserData(auth, null).subscribe((res: any) => {
      if (res.length > 0) {
        this.data = res.reverse();
      } else {
        this.data = []
      }
      console.log(this.data);

    });

    this.serviceAPI.getMenuMappingList().subscribe((res:any)=>{
      this.menuMappingList = res
    })
  }

  toDataURL(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  
  /**
   * file export 
   * 
   */
  // exportToExcle() {
  //   this.arr = this.data;
  //   // arr = this.data.filter(function( obj: any ) {
  //   //   return !obj.__v || !obj._id;
  //   // });
  //   // console.log(arr);
  //   let final = [];
  //   for (let i = this.arr.length - 1; i >= 0; --i) {
  //     delete this.arr[i].__v;
  //     delete this.arr[i]._id;
  //     this.toDataURL(`http://localhost:8000/images/${this.arr[i].Image}`, (dataUrl: any) => {
  //       // console.log('RESULT:', dataUrl)
  //       this.arr[i].Image = dataUrl;
  //     })
      
  //     final.push(this.arr[i]);
  //   }
  //   const ws: xlsx.WorkSheet =
  //     xlsx.utils.json_to_sheet(final);
  //     const wb: xlsx.WorkBook = xlsx.utils.book_new();
  //   xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   xlsx.writeFile(wb, 'usertable.xlsx');
  //   this.getAll();
  //   // let header = Object.keys(this.data[0]);
  //   // header.splice(0, 1);
  //   // header.splice(header.length - 1, 1);
  //   // const wb = xlsx.utils.book_new();
  //   // const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet([]);
  //   // var arr: any[] = [];
  //   // arr.push(header);
  //   // this.data.forEach((ele: any, index: any) => {
  //   //   let array: any[] = [];
  //   //   Object.values(header).map((element: any) => {
  //   //     array[element] = ele[element];
  //   //     // console.log(ele, index, element);
  //   //   })
  //   //   arr.push(array);
  //   //   // 
  //   // })
  //   // console.log([...arr]);
    
  //   // xlsx.utils.sheet_add_aoa(ws, arr);

  //   // xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   // 
  //   // console.log(Object.keys(this.data[0]));

  //   // 
  //   // 



  // }




  exportToExcle() {
    // const ws: xlsx.WorkSheet =
    //   xlsx.utils.table_to_sheet(this.usertable.nativeElement);
    //   const wb: xlsx.WorkBook = xlsx.utils.book_new();
    // xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    // xlsx.writeFile(wb, 'usertable.xlsx');

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
   * menu mapping pop up 
   */
  UpdateMenuMapping() {
    this.menuModal = true
  }

  UpdateMenuMappingChange(event:any ,data:any){
    if (event.target.checked) {
      this.MenuMappingData.push(data)
    } else {
      this.MenuMappingData.splice(this.MenuMappingData.indexOf(data), 1) 
    }
    console.log("data",data, this.MenuMappingData);
  }

  UpdateMenuMappingSubmit() {
    console.log("Submit", this.MenuMappingData);
  }

  closeMenuMapping() {
    this.menuModal = false
    this.getAll();
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
    this.serviceAPI.getAllUserData(localStorage.getItem("authToken"),this.SearchForm.value).subscribe((res: any) => {
      this.data = res.reverse();
    });
  }

  resetForm() {
    this.SearchForm.reset({ Name: "", Status: "" })
    this.serviceAPI.getAllUserData(localStorage.getItem("authToken"), null).subscribe((res: any) => {
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


  /**
   * Export data to excle 
   */




}
