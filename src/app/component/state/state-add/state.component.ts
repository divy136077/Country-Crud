import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.StateForm = this.fb.group({
      CountryName: ['', Validators.required],
      StateName: ['', Validators.required],
      active: [true, Validators.required],
    });

      if (!!this.route.snapshot.params['id']) {
        this.isEdit = true
      this.serviceAPI
        .getByIdState(this.route.snapshot.params['id'])
        .subscribe((res: any) => {
          this.StateForm.patchValue({ ...res, active: res.Status });
        });
    }

  
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

   edit(id: any, data: any) {
    this.submitted = true;
    if (this.StateForm.invalid) {
      return;
    }
    this.serviceAPI.editState(id, data).subscribe({
      next: (response: any) => {
        this.toastr.success('Data Updated sucessfully !');
        this.router.navigateByUrl('/state');
      },
      error: (error) => {
        this.toastr.error('Error in API');
      },
    });
  }
  
  handleAddData() {
     if (!!this.route.snapshot.params['id']) {
      this.edit(this.route.snapshot.params['id'], {
        ...this.StateForm.value,
        Status: this.StateForm.value.active,
      });
    } 
  else {
    this.submitted = true;
    if (this.StateForm.invalid) {
      return;
    }
    this.isSubmitting = true;
    const data = {
      CountryName: this.StateForm.value.CountryName,
      StateName: this.StateForm.value.StateName,
      Status: this.StateForm.value.active,
    };
    this.serviceAPI.addState(data).subscribe((res) => {
      this.toastr.success('Data Added Successfully!');
      this.stateData.push(res);
      this.isSubmitting = false;
    });
  // }
}

  // edit(id: any, data: any) {
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

  // handleDelete(id: any) {
  //   if(confirm("Are you sure want to delete?")){
  //   this.serviceAPI.deleteState(id).subscribe((res: any) => {
  //     this.stateData = this.stateData.filter((x: any) => x._id !== res._id)
  //     this.toastr.error('Data Deleted Successfully!');
  //   });
  // }
  // }

  // closeModal() {
  //   this.editModalId = null
  //   this.modal = false;
  // }

  // cityEdit(element: any) {
  //   this.router.navigateByUrl('/state/edit/' + element._id);
  // }
}
}