import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { API_ROUTES, validationLength } from 'src/app/constant/constant';
import { RegexEnum } from 'src/app/constant/regex';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { clientListModel } from '../model/client.model';
import { GridOption } from '../../../_metronic/shared/crud-table/models/gridoption.model';
import { MatAccordion } from '@angular/material/expansion';
import * as bcrypt from 'bcryptjs'
import { AddNewClientDialogComponent } from 'src/app/_metronic/partials/content/crud/add-new-client-dialog/add-new-client-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client-add-edit',
  templateUrl: './client-add-edit.component.html',
  styleUrls: ['./client-add-edit.component.scss']
})
export class clientAddEditComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  stateList: any;
  industryList: any;
  clientTypeList: any;
  pocTypeList: any;
  pocIdArr: any[] = [];
  documentIdArr: any[] = [];
  TaxnumberList: any;
  currencyList: any;
  invoiceGenerateFormList: any;
  paymentList: any;
  invoiceSentByList: any;
  invoiceSentViaList: any;
  bankdetailsList: any;
  countryid: any;
  sectorList: any;
  priorityList: any;
  companyGroupDetailsList: any;
  pocList: any;
  documentTypeList: any;
  documentFile: any;
  docfile: any;
  documentList: any;
  preview: string
  isShowMessage: boolean;
  files: any;
  pocid: any = "";
  file: any;
  significanceList: any;
  governanceManagementList: any;
  accountManagerList: any;
  bdmList: any;
  docid: any;
  docListModel: any;
  docList: any;
  docAllList: any;


  myButton() {
  }
  activeIdString = 1;
  languageList: any = [];
  roleListModel = new clientListModel();
  pocListModel: any = [];
  translations: any = [];
  currentLang: any;
  langobj: any;
  isSubmitted: boolean;
  roleId: string | number;
  clientGroupForm: FormGroup;
  roleForm: FormGroup;
  pocForm: FormGroup;
  docForm: FormGroup;
  statusArr: any = [
    { value: this.translateService.instant('PAGES.COMMON.ACTIVE'), key: 1 },
    { value: this.translateService.instant('PAGES.COMMON.INACTIVE'), key: 0 }];
  selectedPermission: any = [];
  isReset: boolean;
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
  overseasList: any;
  countryList: any;
  portalList: any;
  groupId: any;
  bankDetail!: boolean;
  day: any;
  periodFrom: any;
  engagementMonthYear: any;
  recentPoc: any[] = [];
  constructor(
    private dialog: MatDialog,
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private fb: FormBuilder,
    private commonService: CommonService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {
    this.initForm();
    this.initForm1();
    this.initForm2();
  }

  async ngOnInit(): Promise<void> {
    // this.groupId = this.route.snapshot.queryParams['id'];
    this.groupId = 38;

    let date = new Date();
    let month : any = ((date.getMonth() + 1 < 10)? '0'+ (date.getMonth() + 1) : (date.getMonth() + 1));
    let year = date.getFullYear();
    this.day = date.toISOString().split('T')[0];
    this.clientGroupForm.patchValue({engagement_month_year: `${year}-${month}`});

    this.accountPriority();
    this.significance();
    this.governanceManagement();
    this.accountManager();
    this.bdm();
    this.getSector()
    this.getOverseas()
    this.getCountry()
    this.getIndustry();
    this.getClientType();
    this.getTypeOfPoc();
    this.getTaxNumber();
    this.getBillingCurrency();
    this.getInvoiceGenerateFrom();
    this.getPayment();
    this.getInvoiceSentBy();
    this.getInvoiceSentVia();
    this.getBankdetails();
    if (this.groupId) {
      this.getClientGroupDetail();
      this.getPoc();
    }
    this.getDocumentType()
    this.getDocument();

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.clientGroupForm.controls;
  }

  selectEngagement() {
    console.log(this.clientGroupForm.value.engagement_month_year)
  }

  /**
   * Form Init
   */
  initForm() {
    this.clientGroupForm = this.fb.group({
      group_name: ['', Validators.compose([
        Validators.required])],
      account_priority: ['', Validators.compose([
        Validators.required])],

  //     significance: ['', Validators.compose([
  //       Validators.required])],

  //     contact_person_name: ['', Validators.compose([
  //       Validators.required])],

  //     email: ['', Validators.compose([
  //       Validators.required, Validators.email,
  //       Validators.pattern(RegexEnum.email),])],

      contact_number: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)])],

  //     governance_management: ['', Validators.compose([
  //       Validators.required])],

  //     account_manager: ['', Validators.compose([
  //       Validators.required])],

      bdm_name: ['', Validators.compose([
        Validators.required])],
      company_name: ['', Validators.compose([
        Validators.required])],
      sector: ['', Validators.compose([
        Validators.required])],
      overseas_domestic: ['', Validators.compose([
        Validators.required])],
      country: ['', Validators.compose([
        Validators.required])],
      state: ['', Validators.compose([
        Validators.required])],
      industry: ['', Validators.compose([
        Validators.required])],
      engagement_month_year: ['', Validators.compose([
        Validators.required])],
      client_type: ['', Validators.compose([
        Validators.required])],

      reference_name: ['', Validators.compose([
        Validators.required])],
      billing_address: ['', Validators.compose([
        Validators.required])],
      tax_number: ['', Validators.compose([
        Validators.required])],
      billing_currency: ['', Validators.compose([
        Validators.required])],
      invoice_generate: ['', Validators.compose([
        Validators.required])],
      payment_terms: ['', Validators.compose([
        Validators.required])],
      sent_to_client: ['', Validators.compose([
        Validators.required])],
      invoice_sent: ['', Validators.compose([
        Validators.required])],
      digital_signature: ['', Validators.compose([
        Validators.required])],
      invoice_sent_name: ['', Validators.compose([
        Validators.required])],
      email_to: ['', Validators.compose([
        Validators.required,
        Validators.pattern(RegexEnum.email)])],
      email_cc: ['', Validators.compose([
        Validators.required,
        Validators.pattern(RegexEnum.email)])],
      instruction_for_accounts: ['', Validators.compose([
        Validators.required])],
      print_bank_detail: ['', Validators.compose([
        Validators.required])],
      bank_details: ['', this.bankDetail ? [Validators.compose([
        Validators.required])] : Validators.nullValidator],
      print_invoice: ['', Validators.compose([
        Validators.required])],

    });
  }

  initForm1() {
    this.pocForm = this.fb.group({
      // client_group_id: [''],
      type_Of_PoC: ['', Validators.compose([
        Validators.required])],
      PoC_name: ['', Validators.compose([
        Validators.required])],
      designation: ['', Validators.compose([
        Validators.required])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)])],
      email_poc: ['', Validators.compose([
        Validators.required, Validators.email,
        Validators.pattern(RegexEnum.email)])],

    })

  }
  initForm2() {
    this.docForm = this.fb.group({
      period_from: ['', Validators.compose([
        Validators.required])],
      period_to: ['', Validators.compose([
        Validators.required])],
      document_type: ['', Validators.compose([
        Validators.required])],
      document: ['', Validators.compose([
        Validators.required])],
    });
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control: any = this.clientGroupForm.controls[controlName] || this.pocForm.controls[controlName] || this.docForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  getClientGroupDetail() {
    this.commonService.getCompanyGroupDetails(this.groupId).subscribe(response => {
      this.roleListModel = response.result;
      console.log(this.roleListModel)
      this.clientGroupForm.patchValue(this.roleListModel);
      this.cdr.detectChanges();
    });
  }

  printBank() {
    if (this.clientGroupForm.value.print_bank_detail == 1) {
      this.bankDetail = true;
    }
    else {
      this.bankDetail = false;
    }
  }

  pocSave() {
    this.isSubmitted = true;
    const controls = this.pocForm.controls;

    // check form
    if (this.pocForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.isSubmitted = false;
      return;
    }

    const pocdata = {

      ClientGroupId: 1,
      PocTypeId: this.pocForm.value.type_Of_PoC,
      PocName: this.pocForm.value.PoC_name,
      Designation: this.pocForm.value.designation,
      PhoneNo: this.pocForm.value.phone,
      Email: this.pocForm.value.email_poc
    }
    this.commonService.createPoc(pocdata).subscribe(res => {
      this.isSubmitted = false;
      if (res.status) {
        this.pocIdArr.push(res.result.id);
        this.toastr.success(res.message, 'Success!');
        if(this.groupId){
          this.getPoc();
          this.pocList.push(res.result[0]);
        }else{
          this.recentPoc.push(res.result[0])
        }
        this.pocForm.reset();
        this.pocForm.patchValue({ type_Of_PoC: '' })
      } else {
        if (res.message) {
          this.toastr.error(res.message, 'Error!');
        }
      }
    }, err => { this.isSubmitted = false; });

    console.log(this.recentPoc)

  }
  getPoc() {
    this.commonService.getPoc(this.groupId).subscribe(response => {
      this.pocList = response.result.items;
      console.log()
    })
  }
  getPocDetail(poc) {

    this.commonService.getOnePoc(poc.id).subscribe(response => {
      this.pocListModel = response.result;

      this.pocid = poc.id
      this.pocForm.patchValue({ "type_Of_PoC": this.pocListModel[0].PocTypeId })
      this.pocForm.patchValue({ "PoC_name": this.pocListModel[0].PocName })
      this.pocForm.patchValue({ "designation": this.pocListModel[0].Designation })
      this.pocForm.patchValue({ "phone": this.pocListModel[0].PhoneNo })
      this.pocForm.patchValue({ "email_poc": this.pocListModel[0].Email })

    });
  }

  updatePoc() {
    const pocdata = {
      ClientGroupId: 1,
      PocTypeId: this.pocForm.value.type_Of_PoC,
      PocName: this.pocForm.value.PoC_name,
      Designation: this.pocForm.value.designation,
      PhoneNo: this.pocForm.value.phone,
      Email: this.pocForm.value.email_poc
    }
    console.log("pocdata", pocdata)
    console.log(this.pocid, "this.pocid")
    this.commonService.updatePoc(this.pocid, pocdata).subscribe(res => {
      this.isSubmitted = false;
      if (res.status) {
        this.toastr.success(res.message, 'Success!');
        this.pocForm.reset();
        this.getPoc();
        this.pocForm.patchValue({ type_Of_PoC: '' })
        this.pocid = ""

      } else {
        if (res.message) {
          this.toastr.error(res.message, 'Error!');
        }
      }
    }, err => { this.isSubmitted = false; });


  }

  deletePoc(poc) {
    this.commonService.deletePoc(poc.id).subscribe(response => {
      this.pocList = response.result
      console.log(this.pocList, "pocList")
      this.getPoc()
    })
  }

  toggelePoc(poc) {
    console.log(poc, "poc--")
    let status = !poc.IsActive;
    this.commonService.toggelPoc({ ids: poc.id, IsActive: status }).subscribe(response => {
      this.pocList = response.result
      this.getPoc()

    })
  }

  onFileChange(event: any) {

    const file = event.target.files[0];
    console.log(file)
    // if(){}
    this.docForm.get('document').setValue(file);

  }

  date() {
    this.periodFrom = this.docForm.value.period_from;
  }

  docsave() {

    this.isSubmitted = true;
    const controls = this.docForm.controls;

    // check form
    if (this.docForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.isSubmitted = false;
      return;
    }

    const formData = new FormData();
    formData.append("DocumentTypeId", this.docForm.get('document_type').value);
    formData.append("PeriodFrom", this.docForm.get('period_from').value);
    formData.append("PeriodTo", this.docForm.get('period_to').value);
    formData.append("document", this.docForm.get('document').value);

    try {
      this.commonService.createDocument(formData)
        .subscribe((data: any) => {
          console.log('success', data);
          if (data) {
            this.documentIdArr.push(data.result.id);
            this.docForm.reset();
          }
        },
          (error) => { console.log('error---', error) })
    } catch (err) { console.log('error in catch', err) }
  }

  getDocument() {
    this.commonService.getDocument().subscribe(response => {
      this.documentList = response.result.items
    })
  }

  getOneDocument(doc) {
    this.commonService.getOneDoc(doc.Id).subscribe(response => {
      this.docListModel = response.result;

      this.docid = doc.Id;
      this.docForm.patchValue({ "document": response.result.DocumentName })
      this.docForm.patchValue({ "period_from": response.result.PeriodFrom.split(" ")[0] })
      this.docForm.patchValue({ "period_to": response.result.PeriodTo.split(" ")[0] })
      this.docForm.patchValue({ "document_type": response.result.DocumentTypeId })
    })
  }
  deleteDoc(doc: any) {

    this.commonService.deleteDoc(doc.Id).subscribe(response => {
      this.docList = response.result
      this.getDocument()
    })

  }


  public download(pdfname: string): void {
    window.open('http://localhost:3001/' + "uploads/" + pdfname);
  }

  // /** Save Data */
  save() {
  //   console.log("save");

    this.isSubmitted = true;
    const controls = this.clientGroupForm.controls;

    // check form
    if (this.clientGroupForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.isSubmitted = false;
      return;
    }

    const addNewClient = {
      clientGroup: {
        ClientGroup: this.clientGroupForm.value.group_name,
        PriorityId: this.clientGroupForm.value.account_priority,
        SignificanceId: this.clientGroupForm.value.significance,
        PersonName: this.clientGroupForm.value.contact_person_name,
        Email: this.clientGroupForm.value.email,
        PhoneNo: this.clientGroupForm.value.contact_number,
        GovernanceManagementId: this.clientGroupForm.value.governance_management,
        AccountManagerId: this.clientGroupForm.value.account_manager,
        BDMId: this.clientGroupForm.value.bdm_name
      },
      companySetup: {
        CompanyName: this.clientGroupForm.value.company_name,
        OverseasId: this.clientGroupForm.value.overseas_domestic,
        SectorId: this.clientGroupForm.value.sector,
        CountryId: this.clientGroupForm.value.country,
        StateId: this.clientGroupForm.value.state,
        IndustryId: this.clientGroupForm.value.industry,
        ClientTypeId: this.clientGroupForm.value.client_type,
        EngagementMonthYear: this.clientGroupForm.value.engagement_month_year
      },
      poc: {
        POCTypeId: this.pocForm.value.type_Of_PoC,
        POCName: this.pocForm.value.PoC_name,
        Designation: this.pocForm.value.designation,
        PhoneNo: this.pocForm.value.phone,
        Email: this.pocForm.value.email_poc,
      },
      POCIds: this.pocIdArr,
      invoiceDetail: {
        ReferenceName: this.clientGroupForm.value.reference_name,
        BillingAddress: this.clientGroupForm.value.billing_address,
        TAXNumber: this.clientGroupForm.value.tax_number,
        BillingCurrency: this.clientGroupForm.value.billing_currency,
        InvoiceGenerateFromId: this.clientGroupForm.value.invoice_generate,
        PaymentTermsId: this.clientGroupForm.value.payment_terms,
        InvoiceSentById: this.clientGroupForm.value.sent_to_client,
        InvoiceSentViaId: this.clientGroupForm.value.invoice_sent,
        IsDigitalSignatureForEmail: this.clientGroupForm.value.digital_signature,
        PersonName: this.clientGroupForm.value.invoice_sent_name,
        EmailTo: this.clientGroupForm.value.email_to,
        EmailCC: this.clientGroupForm.value.email_cc,
        InvoiceInstruction: this.clientGroupForm.value.instruction_for_accounts,
        IsPrintBankDetail: this.clientGroupForm.value.print_bank_detail,
        BankDetailId: this.clientGroupForm.value.bank_details,
        TermsAndConditionToPrintInvoice: this.clientGroupForm.value.print_invoice
      },
      documet: {
        DocumentTypeId: this.docForm.value.document_type,
        DocumentName: this.docForm.value.document,
        PeriodFrom: this.docForm.value.period_from,
        PeriodTo: this.docForm.value.period_to
      },
      DocumentIds: this.documentIdArr
    };

    this.commonService.createNewClientGroup(addNewClient).subscribe(res => {
      if (res) {
        this.isSubmitted = false;
        this.clientGroupForm.reset();
        this.pocIdArr = [];
        this.documentIdArr = [];
        this.recentPoc = [];
        const dialogRef = this.dialog.open(AddNewClientDialogComponent, {
          data: {
            description: `Now you have to create project`,
            title: `Client has been added successfully to the system.`
          }
        });
      }
    }, err => { this.isSubmitted = false; });
  }

  cancle() {
    this.clientGroupForm.reset();
    this.pocForm.reset();
    this.docForm.reset();
  }

  accountPriority() {
    this.commonService.getPriority().subscribe(response => {
      this.priorityList = response.result;
    })
  }

  significance() {
    this.commonService.getSignificance().subscribe(response => {
      this.significanceList = response.result;
    })
  }

  governanceManagement() {
    this.commonService.getGovernanceManagement().subscribe(response => {
      this.governanceManagementList = response.result;
    })
  }

  accountManager() {
    this.commonService.getAccountManager().subscribe(response => {
      this.accountManagerList = response.result;
    })
  }

  bdm() {
    this.commonService.getBDM().subscribe(response => {
      this.bdmList = response.result;
    })
  }

  selectCountry() {
    this.countryid = this.clientGroupForm.value.country;
    console.log('121', this.countryid);
    this.getstate(this.countryid);
  }
  getSector() {
    this.commonService.getSector().subscribe(response => {
      this.sectorList = response.result
    })
  }

  getOverseas() {
    this.commonService.getOverseas().subscribe(response => {
      this.overseasList = response.result
    })
  }
  getCountry() {
    this.commonService.getCountry().subscribe(response => {
      this.countryList = response.result
    })
  }
  getstate(id: any) {
    this.commonService.getState(id).subscribe(response => {
      console.log(response)
      this.stateList = response.result
    })
  }
  getIndustry() {
    this.commonService.getIndustry().subscribe(response => {
      this.industryList = response.result
    })
  }
  getClientType() {
    this.commonService.getclientType().subscribe(response => {
      this.clientTypeList = response.result
      this.clientGroupForm.patchValue({client_type: response.result[0].Id})
    })
  }
  getTypeOfPoc() {
    this.commonService.getTypeOfPoc().subscribe(response => {
      this.pocTypeList = response.result
    })
  }
  getTaxNumber() {
    this.commonService.getTaxNumber().subscribe(response => {
      this.TaxnumberList = response.result
    })
  }
  getBillingCurrency() {
    this.commonService.getBillingCurrency().subscribe(response => {
      this.currencyList = response.result
    })
  }
  getInvoiceGenerateFrom() {
    this.commonService.getInvoiceGenerateFrom().subscribe(response => {
      this.invoiceGenerateFormList = response.result
    })
  }
  getPayment() {
    this.commonService.getPayment().subscribe(response => {
      this.paymentList = response.result
    })
  }
  getInvoiceSentBy() {
    this.commonService.getInvoiceSentBy().subscribe(response => {
      this.invoiceSentByList = response.result
    })
  }
  getInvoiceSentVia() {
    this.commonService.getInvoiceSentVia().subscribe(response => {
      this.invoiceSentViaList = response.result
    })
  }
  getBankdetails() {
    this.commonService.getBankdetails().subscribe(response => {
      this.bankdetailsList = response.result
    })
  }
  getDocumentType() {
    this.commonService.getDocumentType().subscribe(response => {
      this.documentTypeList = response.result
    })
  }
  // getOverseas() {
  //   this.commonService.getOverseas().subscribe(response => {
  //     this.overseasList = response.result
  //   })
  // }
  // getCountry() {
  //   this.commonService.getCountry().subscribe(response => {
  //     this.countryList = response.result
  //   })
  // }
  // getstate(id) {
  //   this.commonService.getState(id).subscribe(response => {
  //     this.stateList = response.result
  //   })
  // }
  // getIndustry() {
  //   this.commonService.getIndustry().subscribe(response => {
  //     this.industryList = response.result
  //   })
  // }
  // getClientType() {
  //   this.commonService.getclientType().subscribe(response => {
  //     this.clientTypeList = response.result
  //   })
  // }
  // getTypeOfPoc() {
  //   this.commonService.getTypeOfPoc().subscribe(response => {
  //     this.pocTypeList = response.result
  //   })
  // }
  // getTaxNumber() {
  //   this.commonService.getTaxNumber().subscribe(response => {
  //     this.TaxnumberList = response.result
  //   })
  // }
  // getBillingCurrency() {
  //   this.commonService.getBillingCurrency().subscribe(response => {
  //     this.currencyList = response.result
  //   })
  // }
  // getInvoiceGenerateFrom() {
  //   this.commonService.getInvoiceGenerateFrom().subscribe(response => {
  //     this.invoiceGenerateFormList = response.result
  //   })
  // }
  // getPayment() {
  //   this.commonService.getPayment().subscribe(response => {
  //     this.paymentList = response.result
  //   })
  // }
  // getInvoiceSentBy() {
  //   this.commonService.getInvoiceSentBy().subscribe(response => {
  //     this.invoiceSentByList = response.result
  //   })
  // }
  // getInvoiceSentVia() {
  //   this.commonService.getInvoiceSentVia().subscribe(response => {
  //     this.invoiceSentViaList = response.result
  //   })
  // }
  // getBankdetails() {
  //   this.commonService.getBankdetails().subscribe(response => {
  //     this.bankdetailsList = response.result
  //   })
  // }


}
