import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { projectName } from 'src/app/constant/constant';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { GridOption } from 'src/app/_metronic/shared/crud-table/models/gridoption.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns = [
    'storage',
    'bandwidth',
    'objects',
    'segmants'
  ]
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
  subscription: any;
  isStorjuser: boolean;
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel(true);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private titleService: Title,
    private translateService: TranslateService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.isStorjuser = true;
    this.titleService.setTitle(projectName + ' | ' + this.translateService.instant('MENU.DASHBOARD'));
    this.subscription = this.translationService.languageVisibilityChange.subscribe((value) => {
      const currentLang = JSON.parse(localStorage.getItem('language'));
      const langobj: any = value;
      this.titleService.setTitle(projectName + ' | ' + this.translateService.instant('MENU.DASHBOARD'));
      if (currentLang.locale !== langobj.locale) {
        this.translationService.setLanguage(langobj);
        this.titleService.setTitle(projectName + ' | ' + this.translateService.instant('MENU.DASHBOARD'));
      }
    });
  }
  pageChange() {
    this.gridOption.pagesize = this.paginator.pageSize;
    this.gridOption.page = this.paginator.pageIndex + 1;
  }
}
