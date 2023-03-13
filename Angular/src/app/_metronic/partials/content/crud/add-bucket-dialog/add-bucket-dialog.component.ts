// Angular
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-bucket-dialog',
  templateUrl: './add-bucket-dialog.component.html',
  styleUrls: ['./add-bucket-dialog.component.scss']
})
export class AddBucketDialogComponent implements OnInit {
  // Public properties
  bucketsId: any;
  isSubmitted: boolean;
  bucketsArr: any = [];
  itemsdrop:any = [];
  /**
   * Component constructor
   *
   * @param dialogRef: MatDialogRef<DeleteEntityDialogComponent>
   * @param templateId: any
   */
  constructor(
    private commonService: CommonService,
    public dialogRef: MatDialogRef<AddBucketDialogComponent>,
    private toastr: ToastrService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public templateId: any,
    ) {
    this.initForm();
  }


  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */
   buckets: FormGroup;
  /**
   * On init
  */
  ngOnInit() { }
  get f() {
    return this.buckets.controls;
  }

  /**
   * Close dialog with false result
   */
   cancel(): void {
    this.dialogRef.close();
  }

  initForm() {
    this.buckets = this.fb.group({
      bucket_name: ['', Validators.required]
    });
  }


  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
   isControlHasError(controlName: string, validationType: string, type?: string, index?: number, name?: string): boolean {
    const control: any = this.buckets.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }

  /**
   * Close dialog with true result
   */
   bucketAdd(): void {
    this.isSubmitted = true;
    const controls = this.buckets.controls;

    // check form
    if (this.buckets.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.isSubmitted = false;
      return;
    }

    const data = {
      bucket_name:this.buckets.value.bucket_name
    }
    this.commonService.createBuckets(data).subscribe(() => {
      this.isSubmitted = false;
      this.dialogRef.close(true);
    },err =>{this.isSubmitted = false;});
  }
}
