import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/api-services.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
})
export class StateComponent {
  isSubmitting: boolean = false;
  submitted: boolean = false;
  StateForm: any;
  
  error!: string;
  stateData: any = [];
  countryData:any = [];
  editModalId:any;
  modal:boolean = false;
  isEdit: boolean = false;
  router: any;

  constructor(
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.StateForm = this.fb.group({
      CountryName: ['', Validators.required],
      StateName: ['', Validators.required],
      active: [false, Validators.required],
    });
  
    // this.serviceAPI.getAllStateData().subscribe((res: any) => {
    //   this.stateData = res;
    // });
    this.serviceAPI.getAllData().subscribe((res: any) => {
      this.countryData = res;
    });
  }

  get field() {
    return this.StateForm.controls;
  }

  // cancelEdit(){
  //   this.editModalId = null
  //   this.isEdit = false
  //   this.StateForm.reset()
  // }
  
  handleAddData() {
    
  //   if (this.isEdit) {
  //     const { CountryName, StateName, active } = this.StateForm.value;
  //     this.serviceAPI.editState(this.editModalId, { CountryName, StateName, IsActive: active  }).subscribe((res: any) => {
  //       this.toastr.success('Data Updated Successfully!');
  //       this.stateData[this.stateData.findIndex((x: any) => x._id === res._id)] = res
  //       this.editModalId = null
  //       this.isEdit = false
  //       this.StateForm.reset()
  //   });
  // }
  // else {
    this.submitted = true;
    if (this.StateForm.invalid) {
      return;
    }
    // this.error = '';

    this.isSubmitting = true;
    const data = {
      CountryName: this.StateForm.value.CountryName,
      StateName: this.StateForm.value.StateName,
      IsActive: this.StateForm.value.active,
    };
    this.serviceAPI.addState(data).subscribe((res) => {
      this.toastr.success('Data Added Successfully!');
      this.stateData.push(res);
      this.isSubmitting = false;
    });
  // }
}

  // edit(id: any, data: any) {
  //   console.log(id, data);
  //   this.isEdit = true
  //   this.StateForm.patchValue({...data, active: data.IsActive});
  //   this.editModalId = id
    // this.modal = true;
  // }

  // handleEdit() {
  //   const { CountryName, StateName, active } = this.StateForm.value;
  //   this.serviceAPI.editState(this.editModalId, { CountryName, StateName, IsActive: active  }).subscribe((res: any) => {
  //     this.toastr.success('Data Updated Successfully!');
  //     this.stateData[this.stateData.findIndex((x: any) => x._id === res._id)] = res
  //   });
  //   this.closeModal()
  // }

  handleDelete(id: any) {
    if(confirm("Are you sure want to delete?")){
    this.serviceAPI.deleteState(id).subscribe((res: any) => {
      this.stateData = this.stateData.filter((x: any) => x._id !== res._id)
      this.toastr.error('Data Deleted Successfully!');
    });
  }
  }

  // closeModal() {
  //   this.editModalId = null
  //   this.modal = false;
  // }

  cityEdit(element: any) {
    this.router.navigateByUrl('/state/edit/' + element._id);
  }
}
