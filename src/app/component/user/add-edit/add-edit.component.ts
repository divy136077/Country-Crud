import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/api-services.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {
  UserForm: any;
  router: any;
  submitted!: boolean;
  CountryForm: any;
  isSubmitting!: boolean;
  isEdit:any;
  userData: any;
  data: any;

  constructor(
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.UserForm = this.fb.group({
      Name: ['' , Validators.required],
      Email: ['',Validators.required],
      Number: ['', Validators.required],
      Image: ['', Validators.required],
      Dob: ['', Validators.required],
      IsActive: ['', Validators.required],
      file:['']
    });

    if (!!this.route.snapshot.params['id']) {
      this.serviceAPI
        .getByIdUser(this.route.snapshot.params['id'])
        .subscribe((res: any) => {
          this.UserForm.patchValue({ ...res, active: res.IsActive });
          console.log('hi', res);
        });
    }

    this.serviceAPI.getAllUserData().subscribe((res: any) => {
      this.userData = res;
    });
   }

   get field() {
    return this.UserForm.controls;
  }

  edit(id: any, data: any) {
    this.serviceAPI.editUser(id, data).subscribe({
      next: (response: any) => {
        console.log(response);
        this.toastr.success('Data Updated sucessfully !');
        this.router.navigateByUrl('/user');
      },
      error: (error) => {
        this.toastr.error('Error in API');
      },
    });
  }

  onChange(e:any){
    const file = e.target.files[0] ;
    this.UserForm.patchValue({file:file});
  }

  handleAddData() {
    if (!!this.route.snapshot.params['id']) {
      this.edit(this.route.snapshot.params['id'], {
        ...this.UserForm.value,
        IsActive: this.UserForm.value.IsActive,
      });
    } else {
      this.submitted = true;
      if (this.UserForm.invalid) {
        return;
      }
      // this.error = ''
    const formdata = new FormData();

    Object.entries(this.UserForm.value).forEach((entry:any)=>{
      const [key, value] = entry;
      console.log(value)

      if(key !='Image' && key!='file'){
        formdata.append(key,value)
      }
    })

    formdata.append('Image', this.UserForm.value.file);
    console.log(formdata)


      this.isSubmitting = true
      const data = {
        Name: this.UserForm.value.Name,
        Email: this.UserForm.value.Email,
        Number: this.UserForm.value.Number,
        Image: this.UserForm.value.Image,
        Dob: this.UserForm.value.Dob,
        IsActive: this.UserForm.value.IsActive,
      };
      this.serviceAPI.addUser(formdata).subscribe((res) => {
        console.log(res)
        this.toastr.success('Data Added Successfully!');
        // this.data.push(res)
        this.isSubmitting = false
      });
    }
  }

}
