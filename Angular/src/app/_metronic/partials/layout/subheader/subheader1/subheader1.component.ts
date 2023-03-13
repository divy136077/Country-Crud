import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../core';
import { SubheaderService } from '../_services/subheader.service';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { filter } from 'rxjs/operators';

interface IBreadcrumb {
  label: any;
  params?: Params;
  url: string;
}

@Component({
  selector: 'app-subheader1',
  templateUrl: './subheader1.component.html',
})
export class Subheader1Component implements OnInit {
  subheaderCSSClasses = '';
  subheaderContainerCSSClasses = '';
  subheaderMobileToggle = false;
  subheaderDisplayDesc = false;
  subheaderDisplayDaterangepicker = false;
  title$: Observable<string>;
  @Input() title: string;

  public breadcrumbs: IBreadcrumb[];

  constructor(
    private layout: LayoutService,
    private subheader: SubheaderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.breadcrumbs = [];
    this.title$ = this.subheader.titleSubject.asObservable();
  }

  ngOnInit() {
    this.title$ = this.subheader.titleSubject.asObservable();
    this.subheaderCSSClasses = this.layout.getStringCSSClasses('subheader');
    this.subheaderContainerCSSClasses = this.layout.getStringCSSClasses(
      'subheader_container'
    );
    this.subheaderMobileToggle = this.layout.getProp('subheader.mobileToggle');
    this.subheaderDisplayDesc = this.layout.getProp('subheader.displayDesc');
    this.subheaderDisplayDaterangepicker = this.layout.getProp(
      'subheader.displayDaterangepicker'
    );
    const root: ActivatedRoute = this.activatedRoute.root;
    this.breadcrumbs = this.getBreadcrumbs(root);
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(x => {
      const path: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(path);
    }
    );
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
