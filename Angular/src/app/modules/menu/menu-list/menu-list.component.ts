import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { MatSort } from '@angular/material/sort';
import { API_ROUTES, MODULES_NAME } from 'src/app/constant/constant';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})

export class MenuListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel(true);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'select',
    'name',
    'menu_type',
    'location',
    'url',
    'status',
    'actions'
  ];

  moduleName = MODULES_NAME.MENU;
  feild: any = [
    'name',
    'menu_type',
    'location',
    'url'
  ];
  titleFeild: any = ['Name', 'Menu Type', 'Location', 'URL'];
  moduleNameServiceRoute = API_ROUTES.MENU;
  moduleUrl = '/menu';
  title = this.translateService.instant('PAGES.MENU.ADD');
  moduleSlug: any = 'menu';
  searchText: any;
  selectedStatus: any = 2;
  constructor(
    public dialog: MatDialog,
    public translateService: TranslateService,
    private titleService: Title,
  ) {
    this.titleService.setTitle(this.translateService.instant('PAGES.MENU.LIST_TITLE'));
  }

  ngOnInit(): void { }


}
