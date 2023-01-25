import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ServiceService } from '../../api-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css'],
})
export class CountryFormComponent {
  data: any = [];
  selectedAll: any;
  CountryForm!: FormGroup;
  EditCountryForm!: FormGroup;
  isSubmitting: boolean = false;
  modal: boolean = false;
  editModalId: any;
  submitted: boolean | undefined;
  error: string | undefined;



  constructor(
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.CountryForm = this.fb.group({
      Name: ['', Validators.required],
      Code: ['', Validators.required],
      active: [false, Validators.required],
    });
    this.EditCountryForm = this.fb.group({
      Name: ['', Validators.required],
      Code: ['', Validators.required,],
      IsActive: [false, Validators.required],
    });

    this.serviceAPI.getAllData().subscribe((res: any) => {
      this.data = res;
    });
  }
  get field() { return this.CountryForm.controls; }


  // handleAddData() {
  //   if(this.CountryForm.valid){
  //     this.submitted = true;
  //     this.isSubmitting = true
  //     const data = {
  //       Name: this.CountryForm.value.Name,
  //       Code: this.CountryForm.value.Code,
  //       IsActive: this.CountryForm.value.active,
  //     };
  //     this.serviceAPI.add(data).subscribe((res) => {
  //       this.toastr.success('Data Added Successfully!');
  //       this.data.push(res)
  //       this.isSubmitting = false
  //     });
  //   }
  // }
  handleAddData() {
    this.submitted = true;
    if (this.CountryForm.invalid) {
      return;
    }
    this.error = ''

    this.isSubmitting = true
    const data = {
      Name: this.CountryForm.value.Name,
      Code: this.CountryForm.value.Code,
      IsActive: this.CountryForm.value.active,
    };
    this.serviceAPI.add(data).subscribe((res) => {
      this.toastr.success('Data Added Successfully!');
      this.data.push(res)
      this.isSubmitting = false
    });
  }


  edit(id: any, data: any) {
    console.log(id, data);
    this.EditCountryForm.patchValue(data);
    this.editModalId = id
    this.modal = true;
  }

  handleEdit() {
    const { Name, Code, IsActive } = this.EditCountryForm.value;
    this.serviceAPI.edit(this.editModalId, { Name, Code, IsActive }).subscribe((res: any) => {
      this.toastr.success('Data Updated Successfully!');
      this.data[this.data.findIndex((x: any) => x._id === res._id)] = res
    });
    this.closeModal()
  }

  handleDelete(id: any) {
    this.serviceAPI.delete(id).subscribe((res: any) => {
      this.data = this.data.filter((x: any) => x._id !== res._id)
      this.toastr.error('Data Deleted Successfully!');
    });
  }

  closeModal() {
    this.editModalId = null
    this.modal = false;
  }

 
}
