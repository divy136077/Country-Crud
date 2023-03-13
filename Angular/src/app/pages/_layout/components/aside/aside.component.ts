import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../_metronic/core';
import { GridOption } from '../../../../_metronic/shared/crud-table/models/gridoption.model';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  disableAsideSelfDisplay: boolean;
  headerLogo: string;
  brandSkin: string;
  ulCSSClasses: string;
  location: Location;
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses: string;
  asideMenuDropdown;
  brandClasses: string;
  asideMenuScroll = 1;
  asideSelfMinimizeToggle = false;
  menuList: any = [];
  menuArr: any = [];
  token: any;
  tokenData: any;
  gridOption: GridOption = {
    allrecords: true,
    page: 1,
    pagesize: 10,
    sortDir: 'asc',
    sortField: 'order',
    locale: 'en',
    filters: {
      status: 1,
      // menu
    }
  };

  constructor(private layout: LayoutService, private loc: Location,
    private commonService: CommonService,) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('authToken');
    this.tokenData = jwt_decode(this.token);
    // load view settings
    this.disableAsideSelfDisplay =
      this.layout.getProp('aside.self.display') === false;
    this.brandSkin = this.layout.getProp('brand.self.theme');
    this.headerLogo = this.getLogo();
    this.ulCSSClasses = this.layout.getProp('aside_menu_nav');
    this.asideMenuCSSClasses = this.layout.getStringCSSClasses('aside_menu');
    this.asideMenuHTMLAttributes = this.layout.getHTMLAttributes('aside_menu');
    this.asideMenuDropdown = this.layout.getProp('aside.menu.dropdown') ? '1' : '0';
    this.brandClasses = this.layout.getProp('brand');
    this.asideSelfMinimizeToggle = this.layout.getProp(
      'aside.self.minimize.toggle'
    );
    this.asideMenuScroll = this.layout.getProp('aside.menu.scroll') ? 1 : 0;
    // this.asideMenuCSSClasses = `${this.asideMenuCSSClasses} ${this.asideMenuScroll === 1 ? 'scroll my-4 ps ps--active-y' : ''}`;
    // Routing
    this.location = this.loc;
    this.getMenuList();
    // this.getBackendMenuList();
  }

  private getLogo() {
    if (this.brandSkin === 'light') {
      return './assets/media/logos/logo-dark.png';
    } else {
      return './assets/media/logos/menu-logo.png';
    }
  }

  getMenuList() {
    this.menuList = [
      {
        link: '/client',
        icon: './assets/media/svg/icons/Shopping/Box1.svg',
        name: 'Project Master'
      },
    ];
  }
  // getBackendMenuList() {
  //   this.gridOption.filters.status = 1;
  //   this.gridOption.allrecords = true;
  //   this.gridOption.filters.menu_type = 'backend';
  //   this.gridOption['menu'] = 'sidemenu';
  //   this.commonService.getBackendMenu('menu', this.gridOption).subscribe(res => {
  //     this.menuArr = res.result;
  //     console.log("menu", this.menuArr);
      
  //   });
  // }
}