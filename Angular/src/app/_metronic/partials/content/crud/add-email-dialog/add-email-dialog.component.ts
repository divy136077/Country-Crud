// Angular
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-email-dialog',
  templateUrl: './add-email-dialog.component.html',
  styleUrls: ['./add-email-dialog.component.scss']
})
export class AddEmailDialogComponent implements OnInit {

  // Public properties
  dropdownSettings:IDropdownSettings;
  viewLoading: boolean;
  clientEmailId: any;
  isSubmitted: boolean;
  permissionArr: any = [
    { value: 'Yes', key: 1 },
    { value: 'No', key: 0 }];
  columnNameArr = [];
  dropdownList = [];
  selectedItems = [];
  showClientDropdown : 0;
  is_edit = 0;
  is_delete = 0;
  is_allowed_add_client = 0;
  checkPermissionArr:any = {};
  requiredField: boolean = false;

  /**
   * Component constructor
   *
   * @param dialogRef: MatDialogRef<DeleteEntityDialogComponent>
   * @param userIdObj: any
   */
  constructor(
    private commonService: CommonService,
    public dialogRef: MatDialogRef<AddEmailDialogComponent>,
    private toastr: ToastrService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public userIdObj: any
  ) {
    this.initForm();
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */
   clientEmail: FormGroup;
  /**
   * On init
   */
  ngOnInit() {
    this.dropdownList = this.userIdObj.clientArr;
    if (this.userIdObj.id && this.userIdObj.email) {
      this.clientEmailId = this.userIdObj.id;
      this.is_edit = this.userIdObj.is_edit ;
      this.is_delete = this.userIdObj.is_delete ;
      this.is_allowed_add_client = this.userIdObj.is_allowed_add_client;
      // this.selectedItems = this.userIdObj.user_client_id;
      this.clientEmail.patchValue(this.userIdObj);
      // this.getClientList();

      if (this.userIdObj.user_client_id != "" && this.userIdObj.user_client_id != null ) {
        this.selectColumnType(this.userIdObj.user_client_id);
      }

    }
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All Clients',
      unSelectAllText: 'UnSelect All Clients',
      allowSearchFilter: true
    };
    this.showClientDropdown = this.userIdObj.edit;
  }

  get f() {
    return this.clientEmail.controls;
  }

  /**
   * Close dialog with false result
   */
   cancel(): void {
    this.dialogRef.close();
  }

  initForm() {
    this.clientEmail = this.fb.group({
      email: ['',
        Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320)]),
      ]
    });
  }


  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
   isControlHasError(controlName: string, validationType: string, type?: string, index?: number, name?: string): boolean {
    const control: any = this.clientEmail.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }

  /**
   * Close dialog with true result
   */
  ClientAdd(): void {
    if(this.selectedItems.length > 0 ){

      this.isSubmitted = true;
      const controls = this.clientEmail.controls;

      // check form
      if (this.clientEmail.invalid) {
        Object.keys(controls).forEach(controlName =>
          controls[controlName].markAsTouched()
        );
        this.isSubmitted = false;
        return;
      }
      this.requiredField = false;
      this.clientEmail.value.parent_user_id = this.userIdObj.userId;

      let column_type = [];
      this.selectedItems.forEach(function(obj){
        column_type.push(obj.id);
      })
      this.clientEmail.value.user_client_id = column_type.toString();
      this.clientEmail.value.is_edit = this.is_edit;
      this.clientEmail.value.is_delete = this.is_delete;
      this.clientEmail.value.is_allowed_add_client = this.is_allowed_add_client;

      this.commonService.createClient(this.clientEmail.value).subscribe(res => {
        this.isSubmitted = false;
        let resArr : any = res;

        if (resArr.message === 'success' || resArr.status === 1) {
          this.toastr.success(resArr.message, 'Success!');
        } else {
          this.toastr.error(resArr.message.id, 'Error!');
        }
        this.dialogRef.close(true);
      },err =>{this.isSubmitted = false;});

    }else{
      this.requiredField = true;
    }
  }

  clientUpdate(): void {
    if(this.selectedItems.length > 0 ){
      const controls = this.clientEmail.controls;

      // check form
      if (this.clientEmail.invalid) {
        Object.keys(controls).forEach(controlName =>
          controls[controlName].markAsTouched()
        );
        return;
      }

      this.clientEmail.value.parent_user_id = this.userIdObj.userId;
      this.clientEmail.value.is_edit = this.is_edit;
      this.clientEmail.value.is_delete = this.is_delete;
      this.clientEmail.value.is_allowed_add_client = this.is_allowed_add_client;

      let column_type = [];
      this.selectedItems.forEach(function(obj){
        column_type.push(obj.id);
      })
      this.clientEmail.value.user_client_id = column_type.toString();

      // this.clientEmail.value.columnNameArr = this.columnNameArr;

      this.commonService.updateClient(this.clientEmail.value, this.clientEmailId).subscribe(res => {
        let resArr : any = res;
        if (resArr.message === 'success' || resArr.status === 1) {
          this.requiredField = false;
          this.toastr.success(resArr.message, 'Success!');
        } else {
          this.toastr.error(resArr.message.id, 'Error!');
        }
        this.dialogRef.close(true);
      });

    }else{
      this.requiredField = true;
    }

  }

  /** selected value stored in the multi select */
  selectColumnType(columnTypeArr: any) {
    for (let i = 0; i < this.dropdownList.length; i++) {
      let Id = this.dropdownList[i].id;
      if (columnTypeArr.includes(Id.toString())) {
        this.selectedItems.push(this.dropdownList[i]);
      }
    }
  }

  public onFilterChange(item: any) {  }
  public onDropDownClose(item: any) {  }

  public onItemSelect(item: any) {
    this.requiredField = false;
    this.addSelectedClient(item.id);
  }

  public onDeSelect(item: any) {
    let id = item.id;
    let index = this.columnNameArr.indexOf(id);
    if (index != -1) {
      this.columnNameArr.splice(index, 1);
    }
  }

  public onSelectAll(item: any) {
    if (item.length > 0 ){
      this.requiredField = false;
      for (let i=0; i < item.length; i++) {
        this.addSelectedClient(item[i].id);
      }
    }
  }

  public onDeSelectAll(item: any) {
    this.requiredField = true;
    this.columnNameArr = [];
  }

  public addSelectedClient(id) {
    let index = this.columnNameArr.indexOf(id);
    if (index == -1) {
      this.columnNameArr.push(id);
    }
  }


  /** Get client list detail */
  getClientList() {
      this.commonService.getClienttypeListbyclientId(this.clientEmailId).subscribe(response => {
      this.dropdownList = response.items;
      this.selectColumnType(this.dropdownList);
    });
  }

  selectModule(id, $event){

    if (id == 1) {
      this.is_allowed_add_client = ($event == true) ? 1 : 0;
     }else if (id == 2) {
      this.is_edit = ($event == true) ? 1 : 0;
     } else {
      this.is_delete = ($event == true)   ? 1 : 0;
     }
  }

}
