// Angular
import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
// import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import * as FormData from 'form-data';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/modules/auth';

@Injectable()
export class InterceptService implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  // intercept request and add token
  constructor(
    // public loaderService: LoaderService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (this.requests && this.requests.length > 0) {
      this.authService.displayLoader(true);
    } else {
      this.authService.displayLoader(false);
    }
    if (i >= 0) {
      this.requests.splice(i, 1);
    }

  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("error-----")
    this.authService.displayLoader(true);
    const languageId = localStorage.getItem('language');
    if (request.body instanceof FormData) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('authToken'),
          language: languageId
        }

      });
    } else {
      if (localStorage.getItem('authToken') && localStorage.getItem('authToken') !== null && localStorage.getItem('authToken') !== undefined && localStorage.getItem('language') && localStorage.getItem('language') !== null && localStorage.getItem('language') !== undefined) {
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
            'language': languageId
          }
        });
        // tslint:disable-next-line: triple-equals
      } else {
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
          }
        });
      }
    }
    this.requests.push(request);
    // this.spinner.show();
    return Observable.create(observer => {
      const subscription = next.handle(request)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(request);
              observer.next(event);
            }
          },
          err => {
            if (err.status === 401 || err.status === 403) {
              // handle error
              this.authService.logout();
              // this.spinner.hide();
              this.authService.displayLoader(false);

              this.router.navigate(['/auth/login']).then(() => {
                this.toastr.error(err.error?.message, 'Error!');
                // this.toastr.error(this.translateService.instant('PAGES.COMMON.TOKENEXPIRE'), 'Error!');
              });
            } else if (err.status === 500 || err.status === 400) {
              // this.router.navigate(['/somethingwentwrong']).then(() => {
              if (err.error.error) {
                this.toastr.error(this.translateService.instant(err.error.error), 'Error!');
              } else {
                this.toastr.error(this.translateService.instant('Something went wrong'), 'Error!');
              }
              // });
            } else {
              if (err.status != 420 && err.error?.message) {
                this.toastr.error(err.error?.message, 'Error!');
              }
            }
            this.removeRequest(request);
            observer.error(err);
            this.authService.displayLoader(false)
            return throwError(err);
          },
          () => {
            this.removeRequest(request);
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });

  }
}
