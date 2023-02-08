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
  SearchForm:any;
  constructor(
    private router : Router,
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.SearchForm = this.fb.group({
      StateName: ['', Validators.required],
      Status: ['1'],
    });

    this.serviceAPI.getAllStateData().subscribe((res: any) => {
      this.stateData = res.reverse();
    });
  }
  search(){
    this.serviceAPI.getAllStateData(this.SearchForm.value).subscribe((res: any) => {
      this.stateData = res.reverse();
      console.log(this.SearchForm.value);
      
    });
  }

  resetForm(){
    this.SearchForm.reset()
    this.serviceAPI.getAllStateData().subscribe((res: any) => {
      this.stateData = res.reverse();
    });
  }


    userEdit(id:any){
    this.router.navigateByUrl('/state/edit/' + id)
  }

  userDelete(id: any) {
    if(confirm("Are you sure want to delete?")){
    this.serviceAPI.deleteState(id).subscribe((res: any) => {
      this.stateData = this.stateData.filter((x: any) => x._id !== res._id)
      this.toastr.error('Data Deleted Successfully!');
    });
  }
  }
}
