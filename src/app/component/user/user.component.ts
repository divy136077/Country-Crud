import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  constructor(
    private router : Router,
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.serviceAPI.getAllUserData().subscribe((res: any) => {
      this.data = res.reverse();
    });
  }


  userEdit(id:any){
    this.router.navigateByUrl('/user/edit/' + id)
  }

  userDelete(id: any) {
    if (confirm("Are you sure want to delete?")) {
      this.serviceAPI.deleteUser(id).subscribe((res: any) => {
        this.data = this.data.filter((x: any) => x._id !== res._id)
        this.toastr.error('Data Deleted Successfully!');
      });
    }
  }


}
