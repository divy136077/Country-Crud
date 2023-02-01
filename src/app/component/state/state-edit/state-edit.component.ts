import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/api-services.service';

@Component({
  selector: 'app-state-edit',
  templateUrl: './state-edit.component.html',
  styleUrls: ['./state-edit.component.css']
})
export class StateEditComponent {
  StateForm: any;
  stateData: any;
  countryData: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private serviceAPI: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.StateForm = this.fb.group({
      CountryName: ['', Validators.required],
      StateName: ['', Validators.required],
      active: [false, Validators.required],
    });
    console.log(this.StateForm.value);
    this.serviceAPI.getByIdState(this.route.snapshot.params['id'])
      .subscribe((res: any) => {
        this.StateForm.patchValue({ ...res, active: res.IsActive });
        console.log("hi", res);
        // alert("Data sucessfully Updated")

      });
      this.serviceAPI.getAllStateData().subscribe((res: any) => {
        this.stateData = res;
      });
    this.serviceAPI.getAllData().subscribe((res: any) => {
      this.countryData = res;
    });

  }

  diag() {

    this.edit(this.route.snapshot.params['id'], {...this.StateForm.value , IsActive: this.StateForm.value.active });

  }
  edit(id: any, data: any) {


    this.serviceAPI.editState(id, data).subscribe({
      next: ((response: any) => {
        console.log(response);
        this.toastr.success('Data Updated sucessfully !');
        this.router.navigateByUrl('/state');
      }),
      error: ((error) => {
        this.toastr.error('Error in API');
      }
      ),
    }
    );
  }


}
