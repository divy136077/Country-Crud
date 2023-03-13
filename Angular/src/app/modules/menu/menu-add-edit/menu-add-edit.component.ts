import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES, validationLength } from 'src/app/constant/constant';
import { RegexEnum } from 'src/app/constant/regex';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { MenuListModel } from '../model/menu.model';
import { GridOption } from '../../../_metronic/shared/crud-table/models/gridoption.model';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-menu-add-edit',
  templateUrl: './menu-add-edit.component.html',
  styleUrls: ['./menu-add-edit.component.scss']
})
export class MenuAddEditComponent implements OnInit {
  activeIdString = 1;
  languageList: any = [];
  menuListModel = new MenuListModel();
  translations: any = [];
  currentLang: any;
  langobj: any;
  isSubmitted: boolean;
  menuId: string | number;
  portalList:[];
  menuForm: FormGroup;
  modulelist:any=[];
  userDetail = JSON.parse(localStorage.getItem('userDetail'));
  statusArr: any = [
    { value: this.translateService.instant('PAGES.COMMON.ACTIVE'), key: 1 },
    { value: this.translateService.instant('PAGES.COMMON.INACTIVE'), key: 0 }];
  locationArr: any = [
    { value: 'footer', key: 'Footer' },
    { value: 'header', key: 'Header' }];
  menuTypeArr: any = [
    { value: 'backend', key: 'Backend' },
    { value: 'frontend ', key: 'Frontend' }
  ]
  isReset: boolean;
  moduleNameServiceRoute = API_ROUTES.MENU;
  fieldLength = validationLength;
  moduleList: any = [];
  menuList: any = [];
  gridOption: GridOption = {
    allrecords: true,
    page: 1,
    pagesize: 10,
    sortDir: 'asc',
    sortField: 'name',
    locale: 'en',
    filters: {
      status: 1
    }
  }

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private fb: FormBuilder,
    private commonService: CommonService,
    private toastr: ToastrService
  ) {
    this.initForm();
  }

  async ngOnInit(): Promise<void> {
    console.log("dhwhdkjwhdkjwhdewkjdhwkjdhkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    this.getParentMenuList();
      this.getPortalList();
    const hashId = this.route.snapshot.queryParams['id'];
    const id = localStorage.getItem('id')
    const menuId  = await bcrypt.compare(id, hashId);
    
    console.log("menuID",menuId);
    
      this.menuId = id;
      // this.getModuleList();
      
      console.log("dwsdsdss", this.getPortalList());
      if(menuId == true){
      if (this.menuId) {
        this.titleService.setTitle(this.translateService.instant('PAGES.MENU.EDIT_TITLE'));
        this.getDetail();
      } else {
        this.titleService.setTitle(this.translateService.instant('PAGES.MENU.ADD_TITLE'));
      }
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.menuForm.controls;
  }

  /**
   * Form Init
   */
  initForm() {
    this.menuForm = this.fb.group({
       name: ['', Validators.compose([
        // Validators.required, Validators.pattern(RegexEnum.name),
        // Validators.minLength(validationLength.nameMinLength),
        // Validators.maxLength(validationLength.nameMaxLength)
      ]
        )],
        title: ['', Validators.compose([
          // Validators.required, Validators.pattern(RegexEnum.name),
          // Validators.minLength(validationLength.nameMinLength),
          // Validators.maxLength(validationLength.nameMaxLength)
        ])],
        parent: [''],
        location: ['',Validators.required],
        portal_id: ['', Validators.compose([
          Validators.required])],
        module_id: ['', Validators.compose([
          Validators.required])],
        menu_type: ['', Validators.compose([
          Validators.required])],
        url: [''],
        order: ['', [Validators.compose([Validators.required]), Validators.pattern('^[0-9]*$'),
        Validators.maxLength(5)]],
        icon: ['',Validators.required],
      status: [1],
    });
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control: any = this.menuForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
  onPortalChange(e){
    if(e != 0){
      this.commonService.getModuleOne(e, 'module').subscribe(response => {
        this.modulelist = response.result;
      });
    }
  }
  /** Get Detail by id */
  getDetail() {
    this.commonService.getOne(this.menuId, this.moduleNameServiceRoute).subscribe(response => {
      this.menuListModel = response.result;
      this.onPortalChange(response.result.portal_id);
      this.menuForm.patchValue(this.menuListModel);
    });
  }

  /** Reset Form */
  reset() {
    // filterValue.reset();
    this.menuForm.reset({ status: this.statusArr[0].key, parent: '', module_id: '', menu_type: '', location: '' });
    this.isReset = !this.isReset;
  }

  /** Save Data */
  save() {
    this.isSubmitted = true;
    const controls = this.menuForm.controls;

    // check form
    if (this.menuForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.isSubmitted = false;
      return;
    }
    this.commonService.create(this.menuForm.value, this.moduleNameServiceRoute).subscribe(res => {
      this.isSubmitted = false;
      if (res.status) {
        this.router.navigate(['menu']).then(() => {
          this.toastr.success(res.message, 'Success!');
        });
      } else {
        if (res.message) {
          this.toastr.error(res.message, 'Error!');
        }
      }
    }, err => { this.isSubmitted = false; });
  }

  /** Update Data */
  update(isUpdate) {
    const controls = this.menuForm.controls;

    // check form
    if (this.menuForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    // if(this.menuForm.value.module_id) {
    // this.menuForm.value['module_name'] = this.moduleList.find(item => item.id == this.menuForm.value.module_id).name;
    // }
    // if (this.menuForm.value.module_id) {
    //   this.menuForm.value['slug'] = this.moduleList.find(item => item.id == this.menuForm.value.module_id).slug;
    // }
    this.commonService.update(this.menuForm.value, this.moduleNameServiceRoute, this.menuId).subscribe(res => {
      if (res.status) {
        if (isUpdate) {
          this.router.navigate(['menu']).then(() => {
            this.toastr.success(res.message, 'Success!');
          });
        } else {
          this.toastr.success(res.message, 'Success!');
        }
      } else {
        if (res.message) {
          this.toastr.error(res.message, 'Error!');
        }
      }
    });
  }

  // getModuleList() {
  //   this.commonService.searchAll('module', this.gridOption).subscribe(response => {
  //     this.moduleList = response.result.items;
  //     console.log(229,this.moduleList);
      
  //   });
  // }

  getParentMenuList() {
    this.commonService.searchAll('menu', this.gridOption).subscribe(response => {
      this.menuList = response.result.items;
    });
  }
  getPortalList() {
    // console.log("ddwdwdwdwdwdwwdw",this.userDetail);
    
    this.gridOption.filters.ownerId = this.userDetail.id;
    this.commonService.searchAll('portals', this.gridOption).subscribe(response => {
      delete(this.gridOption.filters.ownerId);
      this.portalList = response.result.items;
      console.log("wdghdvhsdjhsvdhjvd,snmmmmmmmmmmmmmmmmmmmm,.",this.portalList);
      
    });
  }
}
