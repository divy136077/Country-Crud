import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { LayoutService, DynamicHeaderMenuService } from '../../../../../_metronic/core';

interface IBreadcrumb {
  label: any;
  params?: Params;
  url: string;
}

@Component({
  selector: 'app-header-menu-dynamic',
  templateUrl: './header-menu-dynamic.component.html',
  styleUrls: ['./header-menu-dynamic.component.scss']
})
export class HeaderMenuDynamicComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  currentUrl: string;
  menuConfig: any;
  public breadcrumbs: IBreadcrumb[];
  constructor(
    private layout: LayoutService,
    private router: Router,
    private menu: DynamicHeaderMenuService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {
    // Breadcrumb start
    const root: ActivatedRoute = this.activatedRoute.root;
    this.breadcrumbs = this.getBreadcrumbs(root);
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(x => {
      const path: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(path);
    }
    );
    // Breadcrumb over
  }

  ngOnInit(): void {
    // router subscription
    this.currentUrl = this.router.url.split(/[?#]/)[0];
    const routerSubscr = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
      this.cdr.detectChanges();
    });
    this.subscriptions.push(routerSubscr);

    // menu load
    const menuSubscr = this.menu.menuConfig$.subscribe(res => {
      this.menuConfig = res;
      this.cdr.detectChanges();
    });
    this.subscriptions.push(menuSubscr);
  }

  isMenuItemActive(path) {
    if (!this.currentUrl || !path) {
      return false;
    }

    if (this.currentUrl === path) {
      return true;
    }

    if (this.currentUrl.indexOf(path) > -1) {
      return true;
    }

    return false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    const children: ActivatedRoute[] = route.children;
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
      const params = child.snapshot.params;
      // tslint:disable-next-line: deprecation
      if (!isNullOrUndefined(label)) {
        breadcrumbs.push({ label, url, params });
      }
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
