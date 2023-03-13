import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { HttpParams } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { API_ROUTES, MODULES_NAME } from 'src/app/constant/constant';



@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})

export class clientListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel(true);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'ClientGroup',
    'name',
    'status',
    'actions'
  ];
  moduleName = MODULES_NAME.CLIENT;
  feild: any = [
    'name'
  ];
  titleFeild: any = ['Name'];
  moduleNameServiceRoute = API_ROUTES.CLIENT;
  moduleUrl = '/client';
  moduleSlug = 'client'
  title = this.translateService.instant('PAGES.CLIENT.ADD');
  searchText: any;
  selectedStatus: any = 2;
  clientGroup: any;

  constructor(
    public dialog: MatDialog,
    public translateService: TranslateService,
    private titleService: Title,
    private commonService : CommonService
  ) {
    this.titleService.setTitle(this.translateService.instant('PAGES.CLIENT.LIST_TITLE'));
  }
  ngOnInit(): void { 
    this.getClientGroupList();
  }

  getClientGroupList(){

    this.commonService.getAllClientGroup().subscribe((res:any)=>{
      this.clientGroup = res.result ;
      console.log(res.result);
    })
  }

}
