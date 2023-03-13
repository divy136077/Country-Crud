import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { MatAccordion } from '@angular/material/expansion';


@Component({
  selector: 'app-assign-project-add-edit',
  templateUrl: './assign-project-add-edit.component.html',
  styleUrls: ['./assign-project-add-edit.component.scss']
})
export class AssignProjectAddEditComponent implements OnInit {
  Status: any;
  Type: any;
  Manager: any;
  Lead: any;
  Member: any;
  Time: any;
  StatusFrequency: any;
  DayOfMonth: any;
  CallFrequency: any;
  ResourceCategory: any;
  ResourceName: any;
  ResourceBand: any;
  Percentage: any;
  milestoneForm: FormGroup;
  MilestoneData: any;
  isEdit: boolean;
  isSubmitting: boolean;
  id: any;
  Milestone: any;
  MilestoneData1: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private commonService: CommonService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) { this.initForm(), this.milestoneInitForm() }

  async ngOnInit(): Promise<void> {
    this.getStatus()
    this.getProjectType()
    this.getProjectManager()
    this.getProjectLead()
    this.getProjectTeamMember()
    this.getTimeZone()
    this.getProjectStatusFrequency()
    this.getDayOfMonth()
    this.getProjectCallFrequency()
    this.getMilestonePercentage()
    this.getResourceCategory()
    this.getResourceName()
    this.getResourceBand()
    this.getAllMilestoneData()

  }

  getStatus() {
    this.commonService.getAllStatus().subscribe(response => {
      this.Status = response.result;
    });
  }

  getProjectType() {
    this.commonService.getAllProjectType().subscribe(response => {
      this.Type = response.result;
    });
  }
  getProjectManager() {
    this.commonService.getAllProjectManager().subscribe(response => {
      this.Manager = response.result;
    });
  }

  getProjectLead() {
    this.commonService.getAllProjectLead().subscribe(response => {
      this.Lead = response.result;
    });
  }

  getProjectTeamMember() {
    this.commonService.getAllProjectTeamMember().subscribe(response => {
      this.Member = response.result;
    });
  }

  getTimeZone() {
    this.commonService.getAllTimeZone().subscribe(response => {
      this.Time = response.result;
    });
  }

  getProjectStatusFrequency() {
    this.commonService.getAllProjectStatusFrequency().subscribe(response => {
      this.StatusFrequency = response.result;
    });
  }

  getDayOfMonth() {
    this.commonService.getAllDayOfMonth().subscribe(response => {
      this.DayOfMonth = response.result;
    });
  }

  getProjectCallFrequency() {
    this.commonService.getAllProjectCallFrequency().subscribe(response => {
      this.CallFrequency = response.result;
    });
  }

  getMilestonePercentage() {
    this.commonService.getAllMilestonePercentage().subscribe(response => {
      this.Percentage = response.result;
    });
  }

  getResourceCategory() {
    this.commonService.getAllResourceCategory().subscribe(response => {
      this.ResourceCategory = response.result;
    });
  }

  getResourceName() {
    this.commonService.getAllResourceName().subscribe(response => {
      this.ResourceName = response.result;
    });
  }

  getResourceBand() {
    this.commonService.getAllResourceBand().subscribe(response => {
      this.ResourceBand = response.result;
    })
  }


  getAllMilestoneData() {
    this.commonService.getAllMilestoneData().subscribe(response => {
      this.MilestoneData1 = response.result;
    })
  }



  @ViewChild(MatAccordion) accordion: MatAccordion;

  isSubmitted: boolean;
  roleId: string | number;
  roleForm: FormGroup;

  // convenience getter for easy access to form fields
  get f() {
    return this.roleForm.controls;
  }
  get g() {
    return this.milestoneForm.controls;
  }

  /**
   * Form Init
   */
  initForm() {
    this.roleForm = this.fb.group({
      Name: ['', Validators.compose([
        Validators.required])],

      ProjectStatusId: ['', Validators.compose([
        Validators.required])],

      ProjectTypeId: ['', Validators.compose([
        Validators.required])],

      ProjectManagerId: ['', Validators.compose([
        Validators.required])],

      ProjectLeadId: ['', Validators.compose([
        Validators.required])],

      ProjectTeamMember: ['', Validators.compose([
        Validators.required])],

      AllowInProductiveApp: ['', Validators.compose([
        Validators.required])],

      TimeZoneId: ['', Validators.compose([
        Validators.required])],

      IMSDateFormat: ['', Validators.compose([
        Validators.required])],

      IsProjectStatusEnable: ['', Validators.compose([
        Validators.required])],

      ProjectStatusFrequencyId: ['', Validators.compose([
        Validators.required])],

      DayOfMonthId: ['', Validators.compose([
        Validators.required])],

      StarDateOfRecurrenceStatusReport: ['', Validators.compose([
        Validators.required])],

      IsProjectReviewCallEnable: ['', Validators.compose([
        Validators.required])],

      ProjectReviewCallFrequencyId: ['', Validators.compose([
        Validators.required])],

      ReviewCallDayOfMonthId: ['', Validators.compose([
        Validators.required])],

      ReviewCallStarDateOfRecurrenceStatusReport: ['', Validators.compose([
        Validators.required])],

      IsCMMIProcess: ['', Validators.compose([
        Validators.required])],

      ResourceCategoryId: ['', Validators.compose([
        Validators.required])],

      ResourceName: ['', Validators.compose([
        Validators.required])],

      BandId: ['', Validators.compose([
        Validators.required])],

      ResourceLevel: ['', Validators.compose([
        Validators.required])],

      TotalHours: ['', Validators.compose([
        Validators.required])],

      BandRate: ['', Validators.compose([
        Validators.required])],

      Amount: ['', Validators.compose([
        Validators.required])],
    })
  }

  milestoneInitForm() {
    this.milestoneForm = this.fb.group({
      MileStoneName: ['', Validators.compose([
        Validators.required])],

      MileStonePercentageId: ['', Validators.compose([
        Validators.required])],

      DueDate: ['', Validators.compose([
        Validators.required])],
    })
  }
  /**validation for roleForm */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control: any = this.roleForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
  /**validation for milestoneFrom */
  isControlMilestoneErrors(controlName: string, validationType: string): boolean {
    const control: any = this.milestoneForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  /**save assign page data */
  save() {
    this.isSubmitted = true;
    const controls = this.roleForm.controls;
    // check form
    if (this.roleForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.isSubmitted = false;
      return;
    }
    this.commonService.createAssign(this.roleForm.value).subscribe(res => {
      this.isSubmitted = false;
      if (res.status) {
        this.router.navigate(['role']).then(() => {
          this.toastr.success(res.message, 'Success!');
        });
      } else {
        if (res.message) {
          this.toastr.success(res.message, 'Error!');
        }
      }
    }, err => { this.isSubmitted = false; });
  }

  /**saveMilestone data only add/update milestone component */
  saveMilestone() {
    this.isSubmitted = true;
    const controls = this.milestoneForm.controls;
    // check form
    if (this.milestoneForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.isSubmitted = false;
      return;
    }
    // this.isSubmitting = true;
    this.commonService.createMilestone(this.milestoneForm.value).subscribe(res => {
      this.isSubmitted = false;
      this.getAllMilestoneData()
      this.resetForm()
      this.toastr.success(res.message, 'Success!');
      if (res.status) {
        this.router.navigate(['role']).then(() => {
          this.toastr.success(res.message, 'Success!');
        });
      } else {
        if (res.message) {
          this.toastr.success(res.message, 'Error!');
        }
      }
    }, err => { this.isSubmitted = false; });
  }

  /**milestone one rwo delete */
  delete(Id: any) {
    if (confirm('Are u sure?')) {
      this.commonService.deleteMilestoneUser(Id).subscribe({
        next: ((response) => {
          this.MilestoneData = response.result;
          // alert("Data sucessfully deleted")
          // this.toastr.success("Data sucessfully Deleted")
          this.getAllMilestoneData()
        }),
        error: ((error) => {
          this.toastr.error('Error in API');
        }
        ),
      }
      );
    }
  }

  /** Get Detail by id */
  edit(id: any) {
    this.isEdit = true
    this.id = id
    this.commonService.getOneData(id).subscribe(response => {
      // this.getAllMilestoneData()
      this.MilestoneData = response.result;
      (response.result[0]).forEach((item: any) => {
        // this.milestoneForm.patchValue(response.result[0]);
        console.log(item, item.Percentage, "list")
        this.milestoneForm.patchValue({ "DueDate": (item.DueDate).split(" ")[0] });
        this.milestoneForm.patchValue({ "MileStoneName": item.MileStoneName });
        this.milestoneForm.patchValue({ "MileStonePercentageId": item.TypeId });
        this.cdr.detectChanges();
      })
    });
  }

  /** update data for milestone table */
  update() {
    this.isSubmitted = true;
    const controls = this.milestoneForm.controls;

    // check form
    if (this.milestoneForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.isSubmitted = false;
      return;
    }
    this.commonService.updateData(this.id, this.milestoneForm.value).subscribe(res => {
      this.isSubmitted = false;
      this.getAllMilestoneData()
      this.resetForm()
      this.toastr.success(res.message, 'Success!');
      this.isEdit = false
    }, err => { this.isSubmitted = false; });
  }
  /**reset form */
  resetForm() {
    this.milestoneForm.reset()
  };

  /**status change for milestone table */
  toggeleStatus(data: any) {
    if (confirm('Status change... Are u sure?')) {
      let status = !data.IsActive
      this.commonService.toggelStatus({ ids: data.Id, IsActive: status }).subscribe(response => {
        this.Milestone = response.result
        this.getAllMilestoneData()
      })
    }
  }
}
