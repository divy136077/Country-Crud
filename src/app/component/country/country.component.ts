import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/api-services.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent {
  data: any = null;
  SearchForm: any;
  checked?: boolean;
  products: any = [];
  getAllData: any;
  clss: string | undefined;
  msg: string | undefined;
  id:any;


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

    this.getAll();
    
  }
  // deleteall =====================================================================================================================
 
  getAll(){
    
    this.serviceAPI.getAllData().subscribe((res: any) => {
      this.data = res.reverse();
    });
  }

  checkAllCheckBox(ev: any) {
    this.data.forEach((x: { checked: any; }) => x.checked = ev.target.checked)
  }

  isAllCheckBoxChecked() {
    return this.data.every((p: { checked: any; }) => p.checked);
  }

  deleteProducts(id:any): void {

   this.id = id;
    }

 deleteProduct(){
  
  if(confirm('Are u sure?')){
    const selectedProducts = this.data.filter((product: { checked: any; }) => product.checked).map((p: { _id: any; }) => p._id);
    console.log('sd',selectedProducts);
    
    this.serviceAPI.delete(selectedProducts).subscribe((res:any)=>{
      console.log('deleted!')
      this.getAll();
    })
  }

  }
  
  








  search() {
    this.serviceAPI.getAllData(this.SearchForm.value).subscribe((res: any) => {
      this.data = res.reverse();
    });
  }

  resetForm() {
    this.SearchForm.reset()
    this.serviceAPI.getAllData().subscribe((res: any) => {
      this.data = res.reverse();
    });
  }

  userEdit(id: any) {
    this.router.navigateByUrl('/country/edit/' + id)
  }

  userDelete(id: any) {
    if (confirm("Are you sure want to delete?")) {
      this.serviceAPI.delete(id).subscribe((res: any) => {
        this.data = this.data.filter((x: any) => x._id !== res._id)
        this.toastr.error('Data Deleted Successfully!');
      });
    }
  }

}
