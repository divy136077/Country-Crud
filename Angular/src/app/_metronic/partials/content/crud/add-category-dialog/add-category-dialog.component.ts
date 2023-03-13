// Angular
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss']
})
export class AddCategoryDialogComponent implements OnInit {
  // Public properties
  categoriesId: any;
  isSubmitted: boolean;
  categoriesArr: any = [];
  itemsdrop:any = [];
  /**
   * Component constructor
   *
   * @param dialogRef: MatDialogRef<DeleteEntityDialogComponent>
   * @param templateId: any
   */
  constructor(
    private commonService: CommonService,
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private toastr: ToastrService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public templateId: any,
    ) {
    this.initForm();
  }


  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */
   categories: FormGroup;
  /**
   * On init
  */
  ngOnInit() {
    this.getAllCategories();
    this.getAllLabel();
  }
  getAllCategories(){
    this.commonService.getAllCategories().subscribe(res => {
     this.categoriesArr = res.items;
     this.commonService.getcategoryById(this.templateId.templaId).subscribe(response => {
      this.categories.patchValue({"items": response.items[0].label ? JSON.parse(response.items[0].label) : '','created_by': response.items[0].categories_id ? response.items[0].categories_id : 2});
     })
    },err =>{
      this.isSubmitted = false;
    });
  }
  getAllLabel(){
    this.commonService.getLabels().subscribe((res:any)=>{
      if (res.status_code == 200) {
        var arr = []
        for(let i=0;i<res.items.length;i++) {
        arr.push(JSON.parse(res.items[i].label));
        }
        arr = [...arr]
        let tmp = [];
        for(let i=0;i<arr.length;i++) {
        tmp = tmp.concat(arr[i])
        }
        this.itemsdrop = tmp.filter((v,i,a)=>a.findIndex(t=>(t.value === v.value && t.name===v.name))===i);
      }
    });
  }

  get f() {
    return this.categories.controls;
  }

  /**
   * Close dialog with false result
   */
   cancel(): void {
    this.dialogRef.close();
  }

  initForm() {
    this.categories = this.fb.group({
      items: ['', Validators.required],
      created_by: ['', Validators.required],
      templateId : this.templateId.templaId,
    });
  }


  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
   isControlHasError(controlName: string, validationType: string, type?: string, index?: number, name?: string): boolean {
    const control: any = this.categories.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }

  /**
   * Close dialog with true result
   */
   categorieAdd(): void {
    this.isSubmitted = true;
    const controls = this.categories.controls;

    // check form
    if (this.categories.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.isSubmitted = false;
      return;
    }

    const data = {
      id:this.categories.value.templateId,
      label:JSON.stringify(this.categories.value.items),
      categories_id:this.categories.value.created_by
    }
    this.commonService.createCategorie(data).subscribe(res => {
      this.isSubmitted = false;
      let resArr : any = res;

      if (resArr.message === 'success' || resArr.status === 1) {
        this.toastr.success(resArr.message, 'Success!');
        this.getAllLabel();
      } else {
        this.toastr.error(resArr.message.id, 'Error!');
      }
      this.dialogRef.close(true);
    },err =>{this.isSubmitted = false;});
  }
}
