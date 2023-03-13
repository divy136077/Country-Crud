import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { RegexEnum } from 'src/app/constant/regex';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import * as moment from 'moment';
import { API_ROUTES, validationLength } from 'src/app/constant/constant';
import { GridOption } from 'src/app/_metronic/shared/crud-table/models/gridoption.model';
import { Observable } from 'rxjs/internal/Observable';
import { DeleteEntityDialogComponent } from 'src/app/_metronic/partials/content/crud/delete-entity-dialog/delete-entity-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEmailDialogComponent } from 'src/app/_metronic/partials/content/crud/add-email-dialog/add-email-dialog.component';
import { environment } from 'src/environments/environment';
import { UserListModel } from '../model/user.model';
var _ = require('lodash');
import * as bcrypt from 'bcryptjs'

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {
  userListModel = new UserListModel();
  show: boolean;
  emailStatus = false;
  imgURL = environment.imageURL;
  imgURLStatus = 0;
  iconURL = environment.imageURL;
  userEmail: any;
  animal: string;
  name: string;
  addClientEmail: boolean;
  userId: string|number;
  isSubmitted: boolean;
  userForm: FormGroup;
  userArr: any;
  clientArr: any;
  userArrLength = 0;
  clientArrLength = 0;
  activeClientArrLength = 0;
  statusArr: any = [
    { value: this.translateService.instant('PAGES.COMMON.ACTIVE'), key: 1 },
    { value: this.translateService.instant('PAGES.COMMON.INACTIVE'), key: 0 }];
  payedArr: any = [
    { value: 'Yes', key: 1 },
    { value: 'No', key: 0 }];
  moduleNameServiceRoute = API_ROUTES.USER;
  rolesArr: any = [];
  countryArr: any;
  roleList: any = [];
  role_id: any[];

  currentDate = moment(new Date()).format('YYYY-MM-DD');
  fieldLength = validationLength;
  gridOption: GridOption = {
    allrecords: true,
    sortDir: 'asc',
    sortField: 'name',
    filters: {
      status: 1
    }
  };
  filteredCountry: Observable<any[]>;
  diffArray: any = {
    removed: [],
    added: []
  };
  files: any;
  preSelectedVals: any = null;
  isFileSelected: boolean;
  moduleList: any = [];
  rightsList: any = [];
  selectedModule: any = [];
  preDefinedPermission: any = [];
  allPermissionArr: any = [];
  allModuleArr: any = [];
  permissions: any;
  isAllSelect: boolean = false;
  myRolesIds: any = [];
  portalList: any;
  selectAllPortalModule = [];


  constructor(
    private translateService: TranslateService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private fb: FormBuilder,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {
    this.getRole();
    this.getModuleList();
    this.getPortalList();
    this.getRightsList();
    this.initForm();
    console.log(this.selectedModule);

  }

  async ngOnInit(): Promise<void> {
    const hashId = this.route.snapshot.queryParams['id'];
    const id = localStorage.getItem('id');
    const userId  = await bcrypt.compare(id, hashId);
   
    console.log("this.userId", this.userId);
    if(userId == true){
      this.userId = id
    if (this.userId) {
      this.titleService.setTitle(this.translateService.instant('PAGES.USER.EDIT_TITLE'));
      this.getDetail();
      this.emailStatus = true;
    } else {
      this.titleService.setTitle(this.translateService.instant('PAGES.USER.ADD_TITLE'));
      this.addClientEmail = false;
    }
  }
}

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  /**
   * Form Init
   */
  initForm() {
    this.userForm = this.fb.group({
      first_name: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegexEnum.name),
          Validators.minLength(validationLength.nameMinLength),
          Validators.maxLength(validationLength.nameMaxLength)
        ])
      ],
      last_name: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegexEnum.name),
          Validators.minLength(validationLength.nameMinLength),
          Validators.maxLength(validationLength.nameMaxLength)
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(RegexEnum.email),
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      phone: ['', Validators.compose([
        Validators.required, this.removeSpaces,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10,15}$')
      ])],
      role_id: ['',
        Validators.compose([
          Validators.required,
        ])],
      status: [1, Validators.required]
    });
  }

  removeSpaces(c: FormControl) {
    if (c && c.value) {
      let removedSpaces = c.value.split(' ').join('');
      c.value !== removedSpaces && c.setValue(removedSpaces);
    }
    return null;
  }
  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string, type?: string, index?: number, name?: string): boolean {
    const control: any = this.userForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }

  /** Get role list */
  getRole() {
    this.commonService.searchAll(API_ROUTES.ROLE, this.gridOption).subscribe(response => {
      this.roleList = response.result.items;
    });
  }

  getModuleList() {
    this.commonService.searchAll('module', this.gridOption).subscribe(response => {
      this.moduleList = response.result.items;
      this.getRightsList();
    });
  }
  /*
   * used to get the portal list form DB*/
  getPortalList() {

    this.commonService.searchAll('portals', this.gridOption).subscribe(response => {
      this.portalList = response.result.items;
    });
  }

  getRightsList() {
    this.commonService.searchAll('rights', this.gridOption).subscribe(response => {
      this.rightsList = response.result.items;
      for (let p = 0; p < this.portalList.length; p++) {
        this.portalList[p].modulePermission = [];
        for (let i = 0; i < this.moduleList.length; i++) {
          if (this.portalList[p].id === this.moduleList[i].portal_id) {
            this.moduleList[i].permission = [];
            this.portalList[p].modulePermission.push(this.moduleList[i]);
            for (let j = 0; j < this.rightsList.length; j++) {

              if (this.portalList[p].modulePermission[i]) {
                if (this.portalList[p].modulePermission[i].id === this.rightsList[j].module_id) {
                  this.portalList[p].modulePermission[i].permission.push(this.rightsList[j]);
                }
              }
            }
          }
        }
      }

      for (let i = 0; i < this.moduleList.length; i++) {
        this.moduleList[i].permission = [];
        for (let j = 0; j < this.rightsList.length; j++) {
          if (this.moduleList[i].id === this.rightsList[j].module_id) {
            this.moduleList[i].permission.push(this.rightsList[j]);
          }
        }
      }
      for (let index = 0; index < this.portalList.length; index++) {
        if (this.portalList[index].hasOwnProperty('modulePermission')) {
          if (this.portalList[index]['modulePermission'].length > 0) {
            let portalId = this.portalList[index]['slug'];
            this.selectAllPortalModule[portalId] = [];
            for (let indexPermission = 0; indexPermission < this.portalList[index]['modulePermission'].length; indexPermission++) {
              if (this.portalList[index]['modulePermission'][indexPermission].hasOwnProperty('permission')) {
                let ModuleIdIndex = this.portalList[index]['modulePermission'][indexPermission]['slug'];
                let ModuleRightsCount = this.portalList[index]['modulePermission'][indexPermission]['permission'].length;
                if (this.allModuleArr.hasOwnProperty(portalId)) {

                  this.allModuleArr[portalId][ModuleIdIndex] = ModuleRightsCount;
                  this.selectAllPortalModule[portalId][ModuleIdIndex] = false;
                } else {

                  this.allModuleArr[portalId] = {};
                  this.allModuleArr[portalId]['selectAll'] = false;
                  this.selectAllPortalModule[portalId][ModuleIdIndex] = false;
                  this.allModuleArr[portalId][ModuleIdIndex] = ModuleRightsCount;
                }

              }
            }
          }
        }
      }
      this.checkAllSelect();
    });
  }
  /** Select all permission of that module */
  selectPortal(portal, e) {

    let obj = {}
    if (this.selectedModule.length > 0) {
      obj = this.selectedModule[0];
    }
    console.log(290, this.selectedModule);

    if (e.checked) {
      let list = {}
      portal.modulePermission.forEach((value, index, self) => {
        if (value.permission.length > 0) {
          const rightValues = value.permission.map((rightvalue, rightIndex, rightSelf) => {
            return rightvalue.slug;
          });
          list = { ...list, [value.slug]: rightValues }
        }
      });
      obj[portal.slug] = list
      this.selectedModule = [obj];
    } else {
      if (this.selectedModule.length > 0) {
        if (this.selectedModule[0].hasOwnProperty(portal.slug)) {
          delete this.selectedModule[0][portal.slug];
        }
      }
    }


  }
  selectModule(portal_id, module: any, e) {
    let obj = {}
    if (this.selectedModule.length > 0) {
      obj = this.selectedModule[0];
    }
    console.log(this.selectedModule);

    if (e.checked) {
      let permissionList = module.permission.map(a => (a.slug));
      if (obj.hasOwnProperty(portal_id)) {
        if (obj[portal_id].hasOwnProperty(module)) {
          let modulePermissionIndex = obj[portal_id].indexOf(permissionList);
          if (modulePermissionIndex > -1) {
            obj[portal_id][module.slug].splice(modulePermissionIndex, 1, permissionList);
          } else {
            obj[portal_id][module.slug] = permissionList;
          }
        } else {
          obj[portal_id][module.slug] = permissionList;
        }
      } else {
        obj[portal_id] = {};
        obj[portal_id][module.slug] = permissionList;

        // obj[portal_id][module].push(permissionList);
      }
      this.selectedModule = [obj];
    } else {
      if (this.selectedModule.length > 0) {
        if (this.selectedModule[0].hasOwnProperty(portal_id)) {
          if (this.selectedModule[0][portal_id].hasOwnProperty(module.slug)) {

            delete this.selectedModule[0][portal_id][module.slug];
          }
        }
      }
    }
    this.checkModuleRoles(portal_id);
  }


  /** Select permission */
  selectPermission(portal_id, permission, module, e) {
    let obj = {}
    if (this.selectedModule.length > 0) {
      obj = this.selectedModule[0];
    }
    if (obj.hasOwnProperty(portal_id)) {
      if (obj[portal_id].hasOwnProperty(module)) {
        let modulePermissionIndex = obj[portal_id][module].indexOf(permission);
        if (modulePermissionIndex > -1) {
          obj[portal_id][module].splice(modulePermissionIndex, 1);
        } else {
          obj[portal_id][module].push(permission);
        }
      } else {
        obj[portal_id][module] = [];
        obj[portal_id][module].push(permission);
      }
    } else {
      obj[portal_id] = {};
      obj[portal_id][module] = [];

      obj[portal_id][module].push(permission);
    }

    this.selectedModule = [obj];
    this.checkModuleRoles(portal_id);
  }

  /*
  * Check all module is select or not */
  checkAllSelect() {
    if (this.selectedModule.length > 0) {
      Object.keys(this.selectedModule[0]).forEach(portalKey => {
        this.checkModuleRoles(portalKey);
      });
    }
    return true;
  }

  /*
  * Check all module selectAll portal permission */
  checkModuleRoles(portalKey) {
    
    
    Object.keys(this.selectAllPortalModule[portalKey]).forEach(rightsKey => {
      this.checkLengthOfPermission(portalKey, rightsKey);
    });
    this.checkSelectAll();
  }

  /*
  * used to check the select all for module (check if module's select all checked or not') */
  checkLengthOfPermission(portalKey, rightsKey) {
   
    let length = this.allModuleArr[portalKey][rightsKey];
    let rightsKeyLength = 0;
    if (this.selectedModule[0][portalKey].hasOwnProperty(rightsKey)) {
      rightsKeyLength = this.selectedModule[0][portalKey][rightsKey].length;
    }
    if (length == rightsKeyLength) {
      this.selectAllPortalModule[portalKey][rightsKey] = true;
    } else {
      this.selectAllPortalModule[portalKey][rightsKey] = false;
    }
  }

  /*
  * In this we will check all portal's foreach*/
  checkSelectAll() {
    
    let keys = Object.keys(this.selectAllPortalModule);
    for (let i = 0; i < keys.length; i++) {
      let id = keys[i];
      this.checkSelectAllPermission(id);
    }
  }


  /*
  * In this we will check permission is selcted or not in the portal module array*/
  checkSelectAllPermission(id) {
    let value = Object.values(this.selectAllPortalModule[id]);
    (value.indexOf(false) !== -1) ? this.allModuleArr[id]['selectAll'] = false : this.allModuleArr[id]['selectAll'] = true;
  }


  /** Get detail by id */
  getDetail() {
    this.commonService.getOne(this.userId, this.moduleNameServiceRoute).subscribe(response => {
      this.userListModel = response.result;
      console.log(555,this.userListModel);
      
      console.log("response", response.result);
      console.log("response", response.result.role_id);

      if(response.result.role_id !== null){
        console.log("bfdbfbfb");
        
      this.role_id =response.result.role_id.split(',').map(function (item: string) {
        return parseInt(item, 10) ;
      });
      // this.role_id = [1,19];
      this.myRolesIds = response.result.role_id.split(',').map(function (item: string) {
        return parseInt(item, 10);

      });
    }
    //  else if (response.result.user_permission == null && response.result.role_id) {
    //       // this.rolePermission(this.role_id);
    //       console.log("Helooooooooooooooooooooooooooooooooooo");

    //       this.selectedModule = JSON.parse(response.result.permissions);
    //       this.selectedModule = response.result.user_permission ? JSON.parse(response.result.user_permission) : JSON.parse(response.result.permissions);
    //     }
      console.log(this.myRolesIds);
      // this.selectedModule = response.result.user_permission ? JSON.parse(response.result.user_permission) : JSON.parse(response.result.permissions);

        if (response.result.user_permission) {

          let permission = response.result.user_permission; 
          console.log(454,permission);

          this.selectedModule = JSON.parse(permission);
          console.log(457,this.selectedModule);

          this.preSelectedVals = JSON.parse(permission);
          console.log(460, this.preSelectedVals);

          this.getRolePermission(this.role_id);
          console.log(481,"hyyyy");
          
          this.getDiffrance();
        } 
       else if ((response.result.user_permission == null || response.result.user_permission == "") && response.result.role_id) {
          // this.rolePermission(this.role_id);
          console.log("Helooooooooooooooooooooooooooooooooooo");

          this.selectedModule = JSON.parse(response.result.permissions);
          this.selectedModule = response.result.user_permission ? JSON.parse(response.result.user_permission) : JSON.parse(response.result.permissions);
        }
      this.userForm.patchValue(this.userListModel);
      this.cdr.detectChanges();
    });
  }


  /** Reset form */
  reset() {
    this.userForm.reset({ status: this.statusArr[0].key });
  }

  /** Save data */


  /** Update data */
  update() {
    if (!_.isEqual(this.preDefinedPermission, this.selectedModule)) {
      this.userForm.value['user_permission'] = JSON.stringify(this.selectedModule);
    } else {
      delete this.userForm.value['user_permission'];
      this.userForm.value['user_permission'] = null;
    }
    const controls = this.userForm.controls;
    // check form
    if (this.userForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      ); this.isSubmitted = false;
      return;
    }
    if (this.userForm.value.role_id) {
      this.userForm.value['role_id'] = this.userForm.value.role_id.toString();
    }
    if (this.userForm.value.role_id) {
      delete this.userForm.value.password
    }
    // console.log("hi",this.portalList[20].slug);
    console.log(497, this.portalList.includes(Object.keys(this.selectedModule[0])));
    console.log();
    var data = Object.keys(this.selectedModule[0]);
    this.userForm.value['user_permission'] = JSON.stringify(this.selectedModule);
     console.log(505, this.userForm.value);

    this.commonService.update(this.userForm.value, this.moduleNameServiceRoute, this.userId).subscribe(res => {
      if (res.status) {
        this.router.navigate(['user']).then(() => {
          this.toastr.success(res.message, 'Success!');
        });
      } else {
        if (res.message) {
          this.toastr.error(res.message, 'Error!');
        }
      }
    });
  }
  /** Get detail by id */
  getCountryList() {
    this.commonService.getAllCountryArr(this.moduleNameServiceRoute).subscribe(response => {
      this.countryArr = response.items;
    });
  }
  imageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size < 4242880 && (event.target.files[0].type === 'image/png' ||
        event.target.files[0].type === 'image/jpg' || event.target.files[0].type === 'image/jpeg')) {
        this.files = event.target.files[0];
        this.imgURLStatus = 1;
        this.isFileSelected = true;
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (e: any) => { // called once readAsDataURL is completed
          this.iconURL = e.target.result;
          this.cdr.detectChanges();
        };
      } else {
        this.isFileSelected = false;
        this.toastr.error('You have uploaded an invalid file type or Maximum upload file size: 4 MB!', 'Success!');
      }
    }
  }

  getRolePermission(ids: any[]) {
    if (this.userId) {
      this.role_id = ids;
    }
    if (Array.isArray(ids) && ids.length > 0) {
      this.preDefinedPermission = this.mergePermission(ids);
    } else {
      this.preDefinedPermission = [];
    }
  }

  getDiffrance() {
    this.preDefinedPermission = this.mergePermission(this.role_id);
    this.diffArray = this.findDiffrance(this.preSelectedVals, this.preDefinedPermission);
  }

  //Role and Permission Logic
  rolePermission(ids: any) { 
    if (this.userId) {
      this.role_id = ids;
    }
    let missing = 0;
    for (let i = 0; i < this.myRolesIds.length; i++) {
      if (ids.indexOf(this.myRolesIds[i]) == -1) {
        missing = this.myRolesIds[i];
      }
    }
    if (missing != 0) {
      this.removePermission(missing);
    }
    
    if (Array.isArray(ids) && ids.length > 0) {
      this.preDefinedPermission = this.mergePermission(ids);
      let myPrmiArr = this.mergePermission(ids);

      Object.entries(myPrmiArr[0]).forEach(([key, value]) => {
        let obj = {}
        if (this.selectedModule.length > 0) {
          if (this.selectedModule[0].hasOwnProperty(key)) {
            Array.prototype.push.apply(this.selectedModule[0][key], value);
            this.selectedModule[0][key] = this.selectedModule[0][key].filter((item: any, index: any) => {
              return (this.selectedModule[0][key].indexOf(item) == index)
            })
          }
          else {
            this.selectedModule[0][`${key}`] = value;
          }
        } else {
          obj[`${key}`] = [];
          obj[`${key}`] = value;
          this.selectedModule = [obj];
        }
      });
      this.addRemovePermission();
    } else {
      // this.selectedModule = []; // was already there 
      this.preDefinedPermission = [];
    }
    this.myRolesIds = ids;
  }

  addRemovePermission() {
    if (this.diffArray.hasOwnProperty('removed')) {
      Object.entries(this.diffArray['removed']).forEach(([key, value]) => {
        let myArray: any = value;
        for (let i = 0; i < myArray.length; i++) {
          const element = myArray[i];
          if (this.selectedModule.length > 0) {
            if (this.selectedModule[0].hasOwnProperty(key)) {
              this.selectedModule[0][key] = this.selectedModule[0][key].filter((x: any) => x != element)
              if (this.selectedModule[0][key].length == 0) {
                delete this.selectedModule[0][key];
              }
            }
          }
        }
      });
    }
  }

  mergePermission(roleIdArr: string | any[]) {
    let arr = [];
    let obj:any;
    console.log("wddwdwdwdwd",roleIdArr);
    for (let i = 0; i < roleIdArr.length; i++) {
      this.roleList.forEach(element => {      
        if(element.id === roleIdArr[i]){
          console.log("hfjkefkjefjkebfjkebfjkbefkjebkb");
         obj = element;
          console.log("------------------",obj);    
        }
      });
      let rights = JSON.parse(obj.rights);
      console.log("+++++++++++",rights);
      
      if (arr.length == 0){
        arr = rights
      } else {
        if (rights.length > 0) {
          arr = this.mergeNestedPermission(arr, rights);
        }
      }
    }
    return arr;
  }

  mergeNestedPermission(mainArr: any[], rightsArr: string | any[]) {
    let keyArr = Object.keys(mainArr[0]);
    for (let i = 0; i < keyArr.length; i++) {
      let rightsObj = rightsArr[0];
      if (rightsObj.hasOwnProperty(keyArr[i])) {
        mainArr[0][keyArr[i]] = [...rightsObj[keyArr[i]], ...mainArr[0][keyArr[i]]]
        let common = new Set(mainArr[0][keyArr[i]])
        mainArr[0][keyArr[i]] = [...common]
        delete rightsObj[keyArr[i]];
      }
    }
    if (rightsArr.length > 0) {
      mainArr[0] = { ...rightsArr[0], ...mainArr[0] }
    }
    console.log(669,mainArr[0]);
    
    return mainArr;
  }

  removePermission(roleIds: number) { 
    let RoleName = this.roleList.filter((y: { id: any; }) => y.id === roleIds)[0];
    let rights = JSON.parse(RoleName.rights)
    Object.entries(rights[0]).forEach(([key, value]) => {
      let myArray: any = value;
      for (let i = 0; i < myArray.length; i++) {
        const element = myArray[i];
        if (this.selectedModule.length > 0) {
          if (this.selectedModule[0].hasOwnProperty(key)) {
            this.selectedModule[0][key] = this.selectedModule[0][key].filter((x: any) => x != element)
            if (this.selectedModule[0][key].length == 0) {
              delete this.selectedModule[0][key];
            }
          }
        }
      }
    });
  }

  togglePassword() {
    this.show = !this.show;
  }

  findDiffrance(data1: any, data2: any) {
    if (data1 != null && data2 != null) {
      let diffArrData1 = Array();
      let diffArrData2 = Array();
      console.log(625, data1);
        let differenceOfKey1 = Object.keys(data1[0]).filter(x => Object.keys(data2[0]).indexOf(x) === -1);
        let differenceOfKey2 = Object.keys(data2[0]).filter(x => Object.keys(data1[0]).indexOf(x) === -1);
        
          Object.entries(data1[0]).forEach(([key, value]) => {
            if (data2[0][`${key}`]) {
              
              
             let data11= Object.values(data1[0][`${key}`]);
             let data22= Object.values(data2[0][`${key}`]);
             
             data11.forEach((ele:any) => {
              let difference = ele.filter((x: any) => !data22.includes(x)); 
              (difference.length > 0) ? diffArrData1[`${key}`] = difference : '';
             })
             data22.forEach((ele:any) => {
              let differenceDat1 = ele.filter((x: any) => !data11.includes(x)); 
              (differenceDat1.length > 0) ? diffArrData2[`${key}`] = differenceDat1 : '';
             })
              // let difference = data1[0][`${key}`].filter((x: any) => !data2[0][`${key}`].includes(x));
              // let differenceDat1 = data2[0][`${key}`].filter((x: any) => !data1[0][`${key}`].includes(x));
              // (difference.length > 0) ? diffArrData1[`${key}`] = difference : '';
              // (differenceDat1.length > 0) ? diffArrData2[`${key}`] = differenceDat1 : '';

            }
          });
        
          console.log(746, diffArrData1, diffArrData2);
      differenceOfKey1.forEach(ele => {
        diffArrData1[`${ele}`] = data1[0][`${ele}`]
      })

      differenceOfKey2.forEach(ele => {
        diffArrData2[`${ele}`] = data2[0][`${ele}`]
      })
      console.log(754, diffArrData1, diffArrData2);
      return {
        added: diffArrData1,
        removed: diffArrData2
      };
    }
  }
}
