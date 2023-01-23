import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ServiceService } from '../../api-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css'],
})
export class CountryFormComponent {
  data: any = [];
  CountryForm!: FormGroup;
  EditCountryForm!: FormGroup;
  isSubmitting: boolean = false;
  modal: boolean = false;
  editModalId: any;

  constructor(
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.CountryForm = this.fb.group({
      Name: ['', Validators.required],
      Code: ['', Validators.required],
      active: [false, Validators.required],
    });
    this.EditCountryForm = this.fb.group({
      Name: ['', Validators.required],
      Code: ['', Validators.required],
      IsActive: [false, Validators.required],
    });

    this.serviceAPI.getAllData().subscribe((res: any) => {
      this.data = res;
    });
  }

  handleAddData() {
    this.isSubmitting = true
    const data = {
      Name: this.CountryForm.value.Name,
      Code: this.CountryForm.value.Code,
      IsActive: this.CountryForm.value.active,
    };
    this.serviceAPI.add(data).subscribe((res) => {
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
    this.serviceAPI.edit(this.editModalId, { Name, Code, IsActive }).subscribe((res:any) => {
      this.data[this.data.findIndex((x:any) => x._id === res._id)] = res
    });
    this.closeModal()
  }

  handleDelete(id:any) {
    this.serviceAPI.delete(id).subscribe((res:any) => {
      this.data = this.data.filter((x:any) => x._id !== res._id)
    });
  }

  closeModal() {
    this.editModalId = null
    this.modal = false;
  }
}
