import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES, validationLength } from 'src/app/constant/constant';
import { RegexEnum } from 'src/app/constant/regex';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { projectListModel } from '../model/project.model';
import { GridOption } from '../../../_metronic/shared/crud-table/models/gridoption.model';
import { MatAccordion } from '@angular/material/expansion';
import * as bcrypt from 'bcryptjs'
import { invalid } from '../../../../assets/vendors/general/moment/moment';
import { start } from 'repl';
// import { log } from '../../../../assets/vendors/general/handlebars/lib/handlebars';


@Component({
  selector: 'app-project-add-edit',
  templateUrl: './project-add-edit.component.html',
  styleUrls: ['./project-add-edit.component.scss']
})
export class ProjectAddEditComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  myButton() {
  }
  activeIdString = 1;
  languageList: any = [];
  roleListModel = new projectListModel();
  translations: any = [];
  currentLang: any;
  langobj: any;
  isSubmitted: boolean;
  roleId: string | number;
  roleForm: FormGroup;
  statusArr: any = [
    { value: this.translateService.instant('PAGES.COMMON.ACTIVE'), key: 1 },
    { value: this.translateService.instant('PAGES.COMMON.INACTIVE'), key: 0 }];
  selectedPermission: any = [];
  isReset: boolean;
  rolePermissions: any = [];
  selectAllPortalModule = [];
  selectAllModule = [];
  moduleNameServiceRoute = API_ROUTES.ROLE;
  fieldLength = validationLength;
  moduleList: any = [];
  portalListArr: any = [];
  rightsList: any = [];
  selectedModule: any = [];
  allPermissionArr: any = [];
  allModuleArr: any = {};
  permissions: any;
  isAllSelectList: any = [];
  gridOption: GridOption = {
    allrecords: true,
    page: 1,
    pagesize: 10,
    sortDir: 'asc',
    sortField: 'name',
    locale: 'en',
    filters: {
    }
  };
  portalList: any;
  PoCList: any;
  focusAreaList: any
  serviceLineList: any
  serviceCategoriesList: any
  projectStatus: any
  projectType: any
  projectPriority: any
  practiceHead: any
  projectPractice: any
  currency: any
  pocForm: any
  pocTableList: any
  country: any
  state: any
  companyList: any
  idPOC: any
  paymentMilestoneForm: any
  idPayment: any
  PaymentMilestoneList: any
  workOrderForm: any
  companyData: any
  startDateValue: any
  endDateValue: any

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private fb: FormBuilder,
    private commonService: CommonService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {
    this.initForm();
    this.initFormPOC();
    this.initFormPaymentMilestone();
    this.initFormworkOderForm();


  }

  async ngOnInit(): Promise<void> {
    // const hashId = this.route.snapshot.queryParams['id'];
    // const id = localStorage.getItem('id')
    // const roleId = await bcrypt.compare(id, hashId);



    // if (roleId == true) {
    //   this.roleId = id;
    // this.getModuleList();
    // this.getPortalList();
    // if (this.roleId) {
    //   this.titleService.setTitle(this.translateService.instant('PAGES.CLIENT.EDIT_TITLE'));
    //   this.getDetail();
    // } else {
    //   this.titleService.setTitle(this.translateService.instant('PAGES.CLIENT.ADD_TITLE'));
    // }
    // }

    this.getPoCList()
    this.getFocusAreaList()
    this.getServiceCategoriesList()
    this.getServiceLineList()
    this.getProjectPractice()
    this.getPracticeHead()
    this.getProjectPriority()
    this.getProjectType()
    this.getProjectStatus()
    this.getCurrency()
    this.getPoc()
    this.getCountry()
    this.getCompanyList()
    this.getPaymentMilestone()












  }

  // convenience getter for easy access to form fields
  get f() {
    return this.roleForm.controls;
  }

  /**
   * Form Init
   */
  initForm() {
    this.roleForm = this.fb.group({
      ComapnyId: ['', Validators.compose([
        Validators.required])],
      sectorId: ['', Validators.compose([
        Validators.required])],
      OverseasID: ['', Validators.compose([
        Validators.required])],
      GeographyId: ['', Validators.compose([
        Validators.required])],
      CountryId: ['', Validators.compose([
        Validators.required])],
      StateId: ['', Validators.compose([
        Validators.required])],
      IndustryId: ['', Validators.compose([
        Validators.required])],
      priority: ['', Validators.compose([
        Validators.required])],



      ServiceLinesId: ['', Validators.compose([
        Validators.required])],
      ServiceCategoryId: ['', Validators.compose([
        Validators.required])],
      FocusAreaId: ['', Validators.compose([
        Validators.required])],


      ProjectStatusId: ['', Validators.compose([
        Validators.required])],
      ProjectTypeId: ['', Validators.compose([
        Validators.required])],
      ProjectPriorityId: ['', Validators.compose([
        Validators.required])],
      Name: ['', Validators.compose([
        Validators.required])],
      PractiseHead: ['', Validators.compose([
        Validators.required])],
      ProjectPractise: ['', Validators.compose([
        Validators.required])],
      EndDate: ['', Validators.compose([
        Validators.required])],
      StartDate: ['', Validators.compose([
        Validators.required])],


      // WorkOrderNumber: ['', Validators.compose([
      //   Validators.required])],
      // WorkOrderDate: ['', Validators.compose([
      //   Validators.required])],
      // WorkOrderAmount: ['', Validators.compose([
      //   Validators.required])],
      // CurrencyId: ['', Validators.compose([
      //   Validators.required])],
      // OneTimeInvoice: ['', Validators.compose([
      //   Validators.required])],
      // AdvanceMilestone: ['', Validators.compose([
      //   Validators.required])],
      // AutoRenewal: ['', Validators.compose([
      //   Validators.required])],
      // WorkOrderFileName: ['', Validators.compose([
      //   Validators.required])],






    });
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control: any = this.roleForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }


  isPOCControlHasError(controlName: string, validationType: string): boolean {
    const control: any = this.pocForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }


  isPaymentMilestoneControlHasError(controlName: string, validationType: string): boolean {
    const control: any = this.paymentMilestoneForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isworkOrderControlHasError(controlName: string, validationType: string): boolean {
    const control: any = this.workOrderForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }


  // /** Get Detail by id */
  // getDetail() {
  //   this.commonService.getOne(this.roleId, this.moduleNameServiceRoute).subscribe(response => {
  //     this.roleListModel = response.result;
  //     if (this.roleListModel.rights) {
  //       this.selectedModule = JSON.parse(this.roleListModel.rights);
  //     }
  //     // this.selectedPermission = this.roleListModel.permission ? this.roleListModel.permission.split(',') : [];
  //     this.roleForm.patchValue(this.roleListModel);
  //     this.cdr.detectChanges();
  //   });
  // }

  // /** Reset Form */
  // reset() {
  //   this.roleForm.reset({ status: this.statusArr[0].key });
  //   this.selectedModule = [];
  //   this.isReset = !this.isReset;
  // }

  initFormPOC() {
    this.pocForm = this.fb.group({
      // client_group_id: ['1'],

      POCName: ['', Validators.compose([
        Validators.required])],
      Designation: ['', Validators.compose([
        Validators.required])],
      PhoneNo: ['', Validators.compose([
        Validators.required, Validators.pattern(/^[0-9]{10,10}$/)])],
      Email: ['', Validators.compose([
        Validators.required, Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z]+\.[a-zA-Z]+$/), Validators.email])],

    })

  }


  initFormPaymentMilestone() {
    this.paymentMilestoneForm = this.fb.group({
      // client_group_id: ['1'],

      MilestoneName: ['', Validators.compose([
        Validators.required])],
      MilestoneAmountPercentage: ['', Validators.compose([
        Validators.required])],
      ExpectedDueDtae: ['', Validators.compose([
        Validators.required])],
    })

  }


  initFormworkOderForm() {
    this.workOrderForm = this.fb.group({
      // client_group_id: ['1'],

      WorkOrderNumber: ['', Validators.compose([
        Validators.required])],
      WorkOrderDate: ['', Validators.compose([
        Validators.required])],
      WorkOrderAmount: ['', Validators.compose([
        Validators.required])],
      CurrencyId: ['', Validators.compose([
        Validators.required])],
      OneTimeInvoice: ['', Validators.compose([
        Validators.required])],
      AdvanceMilestone: ['', Validators.compose([
        Validators.required])],
      AutoRenewal: ['', Validators.compose([
        Validators.required])],
      WorkOrderFileName: ['', Validators.compose([
        Validators.required])],

    })

  }


  pocSave() {

    console.log(this.idPOC)



    console.log('poc save')
    this.isSubmitted = true;
    const pocdata = {
      PocProject: {
        POCName: this.pocForm.value.POCName,
        Designation: this.pocForm.value.Designation,
        PhoneNo: this.pocForm.value.PhoneNo,
        Email: this.pocForm.value.Email
      }
      // ClientGroupId: this.pocForm.value.client_group_id,
    }
    const controls = this.pocForm.controls;

    // console.log('poc designation =',this.pocForm.value.Designation)


    if (this.pocForm.invalid) {

      console.log('11', this.pocForm.invalid)

      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.isSubmitted = false;
      return;
    }

    console.log('poc data value', pocdata)


    if (this.idPOC != null) {

      console.log('update form data', pocdata)

      this.commonService.updatePocProject(this.idPOC, pocdata).subscribe(response => {
        this.isSubmitted = false;
        this.getPoc()
        this.pocForm.reset()

      })
    }
    else {
      this.commonService.createPocProject(pocdata).subscribe(res => {

        this.isSubmitted = false;
        console.log("success data")
        if (res.status) {
          this.toastr.success(res.message, 'Success!');
          this.getPoc();
          this.pocForm.reset()
            ;
        } else {
          if (res.message) {
            console.log('err msg', res.message)
            this.toastr.error(res.message, 'Error!');
          }
        }
      }, err => { this.isSubmitted = false; });

    }

  }



  getPoc() {
    this.commonService.getPocProject().subscribe(response => {
      this.pocTableList = response.result
      // console.log( "pocTableList",this.pocTableList)
    })
  }

  deletePoc(poc: any) {
    this.commonService.deletePocProject(poc.Id).subscribe(response => {
      this.pocTableList = response.result
      this.getPoc()

      // console.log(this.pocList,"pocTableList")
    })
  }

  updatePoc(poc: any) {
    console.log('update', poc)
    this.idPOC = poc

    this.pocTableList.forEach(element => {

      if (poc == element.Id) {
        console.log(element)
        this.pocForm.patchValue(element)
      }
    });

    console.log("update value = ", this.pocForm.value)



    // this.pocForm.patchValue(this.pocForm)


  }

  toggelePoc(poc: any) {
    console.log("toggle = ", poc.Id, poc.POCName, !(poc.IsActive))
    this.commonService.toggelPocProject({ ids: poc.Id, IsActive: !(poc.IsActive) }).subscribe(response => {
      // this.pocTableList = response.result
      this.getPoc()
    })
  }




  paymentMilestoneSave() {

    console.log(this.idPOC)



    console.log('poc save')
    this.isSubmitted = true;
    const paymentMilestonedata = {
      PaymentMilestone: {
        MilestoneName: this.paymentMilestoneForm.value.MilestoneName,
        MilestoneAmountPercentage: this.paymentMilestoneForm.value.MilestoneAmountPercentage,
        ExpectedDueDtae: this.paymentMilestoneForm.value.ExpectedDueDtae
      },
      // ClientGroupId: this.pocForm.value.client_group_id,
    }
    const controls = this.paymentMilestoneForm.controls;

    // console.log('poc designation =',this.pocForm.value.Designation)


    if (this.paymentMilestoneForm.invalid) {

      console.log('11', this.paymentMilestoneForm.invalid)

      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.isSubmitted = false;
      return;
    }

    console.log('poc data value', paymentMilestonedata)


    if (this.idPayment != null) {

      console.log('update form data', paymentMilestonedata)

      this.commonService.updatePaymentMilestoneProject(this.idPayment, paymentMilestonedata).subscribe(response => {
        this.isSubmitted = false;
        this.getPaymentMilestone()
        this.paymentMilestoneForm.reset()

      })
    }
    else {
      this.commonService.createPaymentMilestoneProject(paymentMilestonedata).subscribe(res => {

        this.isSubmitted = false;
        console.log("success data")
        if (res.status) {
          this.toastr.success(res.message, 'Success!');
          this.getPaymentMilestone();
          this.paymentMilestoneForm.reset()
            ;
        } else {
          if (res.message) {
            console.log('err msg', res.message)
            this.toastr.error(res.message, 'Error!');
          }
        }
      }, err => { this.isSubmitted = false; });

    }

  }




  onFileChange(event: any) {
    console.log('------')
    console.log(event.target.files[0])
    const file = event.target.files[0];
    this.workOrderForm.get('WorkOrderFileName').setValue(file);
  }


  startDate(e: any) {

    this.startDateValue = e.target.value
    console.log(this.startDateValue)

    this.endDateValue = this.startDateValue

  }








  // /** Save Data */
  save() {

    this.isSubmitted = true;
    const controls = this.roleForm.controls;

    console.log("form vlaue", this.roleForm.value)


    // check form
    if (this.roleForm.invalid) {

      // console.log('1', this.roleForm.invalid)

      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.isSubmitted = false;
      return;
    }
    // Object.keys(this.selectedPermission).forEach(element => {
    // });
    // this.roleForm.value.rights = JSON.stringify(this.selectedModule);


    const formData = new FormData()
    // console.log("1",this.workOrderForm.get("WorkOrderFileName").value)
    formData.append("file", this.workOrderForm.get("WorkOrderFileName").value)








    const allData = {

      PocProject: {
        POCName: this.pocForm.value.POCName,
        Designation: this.pocForm.value.Designation,
        PhoneNo: this.pocForm.value.PhoneNo,
        Email: this.pocForm.value.Email
      },

      PaymentMilestone: {
        MilestoneName: this.paymentMilestoneForm.value.MilestoneName,
        MilestoneAmountPercentage: this.paymentMilestoneForm.value.MilestoneAmountPercentage,
        ExpectedDueDtae: this.paymentMilestoneForm.value.ExpectedDueDtae
      },
      // PaymentMilestone: {
      //   MilestoneName: this.roleForm.value.MilestoneName,
      //   MilestoneAmountPercentage: this.roleForm.value.MilestoneAmountPercentage,
      //   ExpectedDueDtae: this.roleForm.value.ExpectedDueDtae
      // },

      workOrder: {
        WorkOrderNumber: this.workOrderForm.value.WorkOrderNumber,
        WorkOrderDate: this.workOrderForm.value.WorkOrderDate,
        WorkOrderAmount: this.workOrderForm.value.WorkOrderAmount,
        CurrencyId: this.workOrderForm.value.CurrencyId,
        OneTimeInvoice: this.workOrderForm.value.OneTimeInvoice,
        AdvanceMilestone: this.workOrderForm.value.AdvanceMilestone,
        AutoRenewal: this.workOrderForm.value.AutoRenewal,

        // WorkOrderFileName: formData
      },


      projectData: {
        ProjectPractise: this.roleForm.value.ProjectPractise,
        PractiseHead: this.roleForm.value.PractiseHead,
        Name: this.roleForm.value.Name,
        ProjectPriorityId: this.roleForm.value.ProjectPriorityId,
        ProjectTypeId: this.roleForm.value.ProjectTypeId,
        FocusAreaId: this.roleForm.value.FocusAreaId,
        ServiceCategoryId: this.roleForm.value.ServiceCategoryId,
        ServiceLinesId: this.roleForm.value.ServiceLinesId,
        ProjectStatusId: this.roleForm.value.ProjectStatusId,
        StartDate: this.roleForm.value.StartDate,
        EndDate: this.roleForm.value.EndDate,

        SectorId: this.companyData.SectorId,
        OverseasID: this.companyData.OverseasID,
        GeographyId: this.companyData.GeographyId,
        CountryId: this.companyData.CountryId,
        StateId: this.companyData.StateId,
        IndustryId: this.companyData.IndustryId,
        Priority: this.companyData.Priority
      }

    }


    // console.log("form data", allData)
    // console.log('2',formData)

    formData.append('allData', JSON.stringify(allData))

    this.commonService.createProject(formData).subscribe(res => {
      this.isSubmitted = false;
      if (res.status) {
        // this.router.navigate(['role']).then(() => {
        this.toastr.success(res.message, 'Success!');
        // });
      } else {
        if (res.message) {
          this.toastr.error(res.message, 'Error!');
        }
      }
    }, err => { this.isSubmitted = false; });
  }


  getPaymentMilestone() {
    this.commonService.getPaymentMilestoneName().subscribe(response => {

      this.PaymentMilestoneList = response.result;

      // this.PaymentMilestoneList = response.result.ExpectedDueDtae.split(' ')[0]
      // console.log(this.PoCList)
    });
  }


  deletePaymentMilestone(pm: any) {
    this.commonService.deletePaymentMilestone(pm.Id).subscribe(response => {
      // this.pocTableList = response.result
      this.getPaymentMilestone()

      // console.log(this.pocList,"pocTableList")
    })
  }

  updatePaymentMilestone(pm: any) {
    console.log('update', pm)
    this.idPayment = pm

    this.PaymentMilestoneList.forEach(element => {

      if (pm == element.Id) {
        console.log(element)

        this.paymentMilestoneForm.patchValue({ MilestoneName: element.MilestoneName, MilestoneAmountPercentage: element.MilestoneAmountPercentage, ExpectedDueDtae: element.ExpectedDueDtae.split(' ')[0] })
      }
    });

    console.log("update value = ", this.paymentMilestoneForm.value)

    // this.pocForm.patchValue(this.pocForm)


  }

  toggelePaymentMilestone(pm: any) {

    console.log("toggle = ", pm.Id, !(pm.IsActive))


    this.commonService.toggelPaymentMilestone({ ids: pm.Id, IsActive: !(pm.IsActive) }).subscribe(response => {
      console.log('res', response)
      this.getPaymentMilestone()
    })
  }




  // get poc Name
  getPoCList() {
    this.commonService.getPoCName().subscribe(response => {
      this.PoCList = response.result;
      // console.log(this.PoCList)
    });
  }


  getFocusAreaList() {
    this.commonService.getFocusAreaList().subscribe(response => {
      this.focusAreaList = response.result;
      // console.log(this.PoCList)
    });
  }

  getServiceCategoriesList() {

    this.commonService.getServiceCategoriesList().subscribe(response => {
      this.serviceCategoriesList = response.result;
      // // console.log(this.PoCList)
    });
  }
  getServiceLineList() {

    this.commonService.getServiceLineList().subscribe(response => {
      this.serviceLineList = response.result;
      // console.log(this.PoCList)
    });
  }

  getProjectPractice() {
    this.commonService.getProjectPractice().subscribe(response => {
      this.projectPractice = response.result;
      // console.log(this.PoCList)
    });

  }
  getPracticeHead() {
    this.commonService.getPracticeHead().subscribe(response => {
      this.practiceHead = response.result;
      // console.log(this.PoCList)
    });
  }
  getProjectPriority() {
    this.commonService.getProjectPriority().subscribe(response => {
      this.projectPriority = response.result;
      // console.log(this.PoCList)
    });
  }
  getProjectType() {
    this.commonService.getProjectType().subscribe(response => {
      this.projectType = response.result;
      // console.log(this.PoCList)
    });
  }
  getProjectStatus() {
    this.commonService.getProjectStatus().subscribe(response => {
      this.projectStatus = response.result;
      // console.log(this.PoCList)
    });
  }

  getCurrency() {
    this.commonService.getCurrency().subscribe(response => {
      this.currency = response.result;
      // console.log(this.PoCList)
    });
  }

  getCountry() {
    this.commonService.getCountry().subscribe(response => {
      this.country = response.result
    })
  }

  getStatebyCountry(e: any) {

    this.commonService.getState(e.target.value).subscribe(response => {
      this.state = response.result
    })

  }

  getCompanyList() {
    this.commonService.getCompanyList(1).subscribe(response => {
      // console.log(response)
      this.companyList = response
    })
  }

  selectCompany(e: any) {



    this.companyList.forEach(element => {


      if (e.target.value == element.cId) {

        this.roleForm.patchValue({ sectorId: element.sectorName, OverseasID: element.overseas, CountryId: element.country, StateId: element.state, IndustryId: element.industry, priority: "default", GeographyId: "default" })


        this.companyData = { SectorId: element.sectorId, OverseasID: element.overseasId, CountryId: element.countryId, StateId: element.stateId, IndustryId: element.industryId, priority: "default", GeographyId: "default" }

        console.log(this.companyData)
      }
    });
  }




}