import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/api-services.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  UserForm: any;
  submitted: boolean | undefined;
  isSubmitting: boolean | undefined;
  isEdit: boolean | undefined;

  constructor(
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.UserForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Number: ['', Validators.required],
      Image: ['', Validators.required],
      Dob: ['', Validators.required],
      active: [false, Validators.required],
    });
    // this.serviceAPI.getAllUserData().subscribe((res: any) => {
    //   this.userdata = res;
    // });
  }
  get field() { return this.UserForm.controls; }

  handleAddData() {
    this.submitted = true;
    this.isSubmitting = true
  }

  edit(id: any, data: any) {
    console.log(id, data);
    this.isEdit = true
    // this.CountryForm.patchValue({...data, active: data.IsActive});
    // this.editModalId = id
    // this.modal = true;
  }

  handleDelete(){

  }
}
