import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MODULES_NAME, TEMPLATE_TYPE_ENTITY, USER_ENTITY, ADVANTAGES_ENTITY } from 'src/app/constant/constant';
import { AuthService } from 'src/app/modules/auth';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { DeleteEntityDialogComponent } from 'src/app/_metronic/partials/content/crud/delete-entity-dialog/delete-entity-dialog.component';
import { UpdateStatusDialogComponent } from 'src/app/_metronic/partials/content/crud/update-status-dialog/update-status-dialog.component';
import { environment } from 'src/environments/environment';
import { DeleteModel } from '../../models/delete-item.model';
import { GridOption } from '../../models/gridoption.model';
import { ExcelService } from '../excelService/excel.service';
import jwt_decode from 'jwt-decode';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit, AfterViewInit, OnDestroy {

  // @Input() MultiTabStatus: any;
  @Input() AddEditStatus: any;
  @Input() downloadStatus: any;
  @Input() advanceSearch: any;
  @Input() checkKey: any = 1;
  @Input() moduleNameServiceRoute: any;
  @Input() displayedColumns: any = [];
  @Input() feild: any;
  @Input() searchFeild: any;
  @Input() moduleUrl: any;
  @Input() moduleName: any;
  @Input() titleFeild: any;
  @Input() clientList: any;
  @Input() advanceSearchFields: any;
  @Input() moduleSlug: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection: any = new SelectionModel(true);
  dataSource = new MatTableDataSource();
  advancSelect: any = '';
  advanceSelect: any = '';
  advanceMultiSelect: any = '';
  advanceText: any = '';
  advanceDate: any = '';
  search: any = '';
  resultsLength;
  isLoadingResults = true;
  show: boolean = false;
  isRateLimitReached = false;
  user = true;

  statusArr: any = [
    { value: this.translateService.instant('PAGES.COMMON.ALL'), key: 'all' },
    { value: this.translateService.instant('PAGES.COMMON.ACTIVE'), key: 1 },
    { value: this.translateService.instant('PAGES.COMMON.INACTIVE'), key: 0 }];
  currentDate = moment(new Date()).format('YYYY-MM-DD');
  gridOption: GridOption = {
    allrecords: false,
    page: 1,
    pagesize: 10,
    limit: 10,
    sortDir: '',
    sortField: '',
    locale: 'en',
    filters: {
      //status: [0,1]
    }
  };
  languageList: any = [];
  selectedlang = 'en';
  selectedStatus: any = 'Status';
  created_by: any = 'all';
  deleteModel = new DeleteModel();
  result: any;
  entityName = USER_ENTITY;
  tempalteTypeEntity = TEMPLATE_TYPE_ENTITY;
  tempalteEntity = ADVANTAGES_ENTITY;
  imgURL = environment.imageURL;
  excelURL = environment.excelURL;
  keyid: any = [];
  mainKey: any;
  isKeyShow: boolean = true;
  token: any;
  tokenData: any;
  permissionArr: any = [];
  activeLangId = 'en';
  private subscription;

  fileName = 'User_List';
  reportTitle = 'User List';
  selectedEntity = ['email', 'status', 'phone', 'location', 'user_name', 'role_name'];
  header = ['Email', 'Status', 'Phone', 'Location', 'User Name', 'Role Name'];
  listData: any = [];

  constructor(
    public dialog: MatDialog,
    public translateService: TranslateService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private authService: AuthService,
    private translationService: TranslationService,
    private router: Router,
    private excelService: ExcelService,
    private cdr: ChangeDetectorRef,
    private url : ActivatedRoute
  ) {
    this.subscription = this.translationService.languageVisibilityChange.subscribe((value) => {
      var localSelectedLang = JSON.parse(localStorage.getItem('language'));
      this.activeLangId = localSelectedLang.locale;
      if (localStorage.getItem('authToken')) {
        this.getData();
      }
    });
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.token = localStorage.getItem('authToken');
    this.tokenData = jwt_decode(this.token);
    this.permissionArr = this.tokenData.device_token.user_permission ? JSON.parse(this.tokenData.device_token.user_permission) : JSON.parse(this.tokenData.device_token.permissions);
    this.getSearchVal();
    if (this.moduleName === MODULES_NAME.PORTAL) {
      this.statusArr = [
        { value: this.translateService.instant('PAGES.COMMON.ALL'), key: 'all' },
        { value: this.translateService.instant('PAGES.COMMON.ACTIVE'), key: 1 },
        { value: this.translateService.instant('PAGES.COMMON.INACTIVE'), key: 0 },
        { value: this.translateService.instant('PAGES.PORTAL.MAINTENANCE'), key: 2 }];
    }
    if (this.moduleName === MODULES_NAME.USER) {
      this.user = false;
    }
  }

  ngAfterViewInit() {
    this.getData();
  }

  sortChange() {
    this.gridOption.pagesize = this.paginator.pageSize;
    this.gridOption.limit = this.paginator.pageSize;
    this.paginator.pageIndex = 0;
    this.gridOption.page = this.paginator.pageIndex + 1;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortDir = this.sort.direction;
    this.getData();
  }

  pageChange() {
    this.selection.clear();
    this.gridOption.pagesize = this.paginator.pageSize;
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.page = this.paginator.pageIndex + 1;
    this.getData();
  }

  togglePassword() {
    this.show = !this.show;
  }

  /** get all menu type list */
  applyFilter(filterValue: NgForm) {
    if (this.search) {
      this.gridOption.pagesize = this.paginator.pageSize;
      this.gridOption.limit = this.paginator.pageSize;
      this.paginator.pageIndex = 0;
      this.gridOption.page = this.paginator.pageIndex + 1;
      this.gridOption.sortField = this.sort.active;
      this.gridOption.sortDir = this.sort.direction;
      this.gridOption.filters.search = this.search.trim();
    } else {
      this.gridOption.filters.search = this.search;
    }

    let filterData = filterValue.value;
    let filterStatus = 1;
    if (filterData.status) {
      filterStatus = filterData.status;
    }
    if (this.moduleNameServiceRoute != 'blog' && this.moduleNameServiceRoute != 'donation') {
      let filterDataTest = Object.entries(filterData).reduce((a, [k, v]) => ((v == null || v == '' || v == undefined) ? a : { ...a, [k]: v }), {}); // delete null/undefined/blank from filter
      this.gridOption.filters = filterDataTest;
    }
    this.paginator.pageIndex = 0;
    if (this.selectedStatus !== 'all') {
      this.gridOption.filters.status = Number(this.selectedStatus);
    } else {
      delete this.gridOption.filters.status;
    }
    this.getData();
  }

  reset(filterForm: NgForm) {
    filterForm.reset();
    this.search = '';
    this.selectedStatus = 'all';
    this.gridOption.filters.search = '';
    this.gridOption.page = this.paginator.pageIndex + 1;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortDir = this.sort.direction;
    this.gridOption.pagesize = this.paginator.pageSize;
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.filters = {};
    if (this.clientList && this.clientList.length > 0) {
      this.gridOption.filters.created_by = null;
      this.created_by = 'all';
      this.selectedlang = 'en';
    }
    this.getData();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  getData() {
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortDir = this.sort.direction;
    this.gridOption.locale = this.activeLangId;
    this.commonService.searchAll(this.moduleNameServiceRoute, this.gridOption).subscribe((data: any) => {
      this.result = data.result;
      this.listData = this.result.items;
      this.cdr.detectChanges();
      this.dataSource = new MatTableDataSource(this.result.items);
      this.resultsLength = this.result.totalItems;
      if (this.moduleName === MODULES_NAME.USER) {
        this.authService.setUserListData(this.result.items);
      }
    });
  }

  deleteSelected() {
    const idsForDeletion: any = [];
    this.selection.selected.forEach((data: any) => {
      idsForDeletion.push(data.id);
    });
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent, {
      data: {
        description: 'Are you sure to permanently delete this ' + this.moduleName + '?',
        title: this.moduleName + ' Delete',
        waitDesciption: this.moduleName + ' is deleting...'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteModel.ids = idsForDeletion.join(',');
        this.deleteModel.value = 2;
        this.deleteModel.action = 'delete';
        this.commonService.deleteStatusMany(this.deleteModel, this.moduleNameServiceRoute).subscribe(
          (res: any) => {
            this.getData();
            if (res.status) {
              if (res.items.dependacyResponse && res.items.dependacyResponse.error &&
                res.items.dependacyResponse.error.length > 0) {
                this.toastr.error('Some Records Can not be deleted, Dependency exist', 'Error!');
              }
              this.router.navigate([this.moduleUrl]).then(() => {
                this.selection.clear();
                this.toastr.success(res.message, 'Success!');
                this.getData();
              });
            } else {
              if (res.error) {
                this.toastr.error(res.error, 'Error!');
              } else {
                this.toastr.error(res.message, 'Error!');
              }
              this.selection.clear();
            }
          }
        );
        this.selection.clear();
      }
    });
  }

  /** Delete for single item */
  delete(id): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent, {
      data: {
        description: 'Are you sure to permanently delete this ' + this.moduleName + '?',
        title: this.moduleName + ' Delete',
        waitDesciption: this.moduleName + ' is deleting...'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commonService.delete(id, this.moduleName).subscribe((res: any) => {
          if (res.status) {
            this.toastr.success(res.message, 'Success!');
            this.getData();
          } else {
            this.toastr.error(res.message.id, 'Error!');
          }
        });
      }
    });
  }

  /** update multipal status */
  updateStatus() {
    let statuses = [];
    if (this.moduleName === MODULES_NAME.PORTAL) {
      statuses = [
        { value: 1, text: this.translateService.instant('PAGES.COMMON.ACTIVE') },
        { value: 0, text: this.translateService.instant('PAGES.COMMON.INACTIVE') },
        { value: 2, text: this.translateService.instant('PAGES.PORTAL.MAINTENANCE') }];
    } else {
    statuses = [
      { value: 1, text: this.translateService.instant('PAGES.COMMON.ACTIVE') },
      { value: 0, text: this.translateService.instant('PAGES.COMMON.INACTIVE') }
    ];}
    const dialogRef = this.dialog.open(UpdateStatusDialogComponent, {
      data: {
        Message: 'Selected ' + this.moduleName + ' status have successfully been updated',
        title: 'Change status for selected ' + this.moduleName,
        statuses,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const idsForUpdation: any = [];
        this.selection.selected.forEach((data: any) => {
          idsForUpdation.push(data.id);
        });
        this.deleteModel.ids = idsForUpdation.join(",");
        this.deleteModel.action = 'update';
        this.deleteModel.status = result;
        this.commonService.updateStatusMany(this.deleteModel, this.moduleNameServiceRoute).subscribe((res: any) => {
          if (res.status) {
            this.getData();
            this.router.navigate([this.moduleUrl]).then(() => {
              this.toastr.success(res.message, 'Success!');
              this.selection.clear();
            });
          } else {
            this.toastr.error(res.message.id, 'Error!');
            this.selection.clear();
          }
        });
      }
    });
  }

  /** set class for valid date */
  getDateClass(data) {
    if ((moment(data.valid_until).format('YYYY-MM-DD')) < moment(this.currentDate).format('YYYY-MM-DD')) {
      return true;
    } else {
      return false;
    }
  }

  public isSortingDisabled(columnText: string): boolean {
    if (columnText === 'role_names' || columnText === 'image' || columnText === 'role_name') {
      // || columnText === 'phase.phase_name.name'
      return true;
    } else {
      return false;
    }
  }

  public download(id: string): void {
    // window.open(downloadUrl, '_blank');

    const tmpObj = {
      "id": id,
      'locale': this.selectedlang
    }

    this.commonService.getTemplateById(tmpObj).subscribe((res: any) => {
      if ((res.message === 'success' || res.status === 1) && res.items.excel_data) {
        this.toastr.success(res.message, 'File Download Successful!!');
        this.excelService.generateExcel(JSON.parse(res.items.excel_data));
      } else {
        this.toastr.error(res.message.id, 'No Data Found');
      }
    });


  }
  public getSearchVal() {
    if (this.advanceSearch == 1) {
      this.statusArr = [
        { value: this.translateService.instant('PAGES.COMMON.ALL'), key: 'all' },
        { value: this.translateService.instant('PAGES.COMMON.ACTIVE'), key: 1 },
        { value: this.translateService.instant('PAGES.COMMON.INACTIVE'), key: 0 }];
    }
  }

  public onOff(id) {
    if (this.keyid.indexOf(id) == -1) {
      this.keyid.push(id);
    } else {
      this.keyid.pop(id);
    }
  }

  async getId(e:any){
  const hashId  = await bcrypt.hash(e.toString(),10)
   this.router.navigate([`/${this.moduleUrl}/update`], {queryParams : { "id" : hashId }});
   localStorage.setItem('id',e);
  }

  mySaparateString(myString) {
    return myString.replace(/,(?=[^\s])/g, ", ");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
