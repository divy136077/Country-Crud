import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteEntityDialogComponent } from 'src/app/_metronic/partials/content/crud/delete-entity-dialog/delete-entity-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../i18n/translation.service';
import { Title } from '@angular/platform-browser';
import { UpdateStatusDialogComponent } from 'src/app/_metronic/partials/content/crud/update-status-dialog/update-status-dialog.component';
import { DeleteModel } from 'src/app/_metronic/shared/crud-table/models/delete-item.model';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { API_ROUTES, MODULES_NAME, USER_ENTITY } from 'src/app/constant/constant';
import { HttpParams } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../auth';
import { GridOption } from '../../../_metronic/shared/crud-table/models/gridoption.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  header = ['Name', 'Email', 'Phone', 'Status'];

  displayedColumns: string[] = [
    'select',
    'first_name',
    'email',
    'phone',
    'role_name',
    'created_at',
    'status',
    'actions'
  ];
  feild: any = [
    'email',
    'phone',
    'created_at'
  ];
  titleFeild: any = ['Email', 'Phone', 'Created At'];
  moduleUrl = '/user';
  title = this.translateService.instant('PAGES.USER.ADD');
  moduleName = MODULES_NAME.USER;
  moduleNameServiceRoute = API_ROUTES.USER;
  userData: any = [];
  advanceSearch = 1;
  checkKey = 1;
  roleList: any = [];
  advanceSearchFields: any = [];
  gridOption: GridOption = {
    allrecords: true,
    page: 1,
    pagesize: 10,
    sortDir: '',
    sortField: '',
    locale: 'en',
    filters: {
      status: 1
    }
  };
  moduleSlug = 'user';
  sub: any;

  constructor(
    public dialog: MatDialog,
    public translateService: TranslateService,
    private titleService: Title,
    private authService: AuthService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(this.translateService.instant('PAGES.USER.LIST_TITLE'));
    this.authService.userListData$.subscribe((data) => {
      this.userData = data;
      this.sub = this.route
        .data
        .subscribe(v => {});
    });
  }

  ngOnInit(): void {
    this.getRoleList();
  }

  getRoleList() {
    this.commonService.searchAll('role', this.gridOption).subscribe(response => {
      this.roleList = response.result.items;
      this.advanceSearchFields = [
        {
          title: 'User Role',
          name: 'role',
          data: this.roleList,
          type: 'select',
          language: 'Role',
          translationskey: 'name',
          valueKey: 'name',
          multiple: true
        },
      ]
    });
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
}
