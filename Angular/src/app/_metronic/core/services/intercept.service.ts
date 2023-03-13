import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
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
    if (request.body instanceof FormData) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('authToken'),
        }

      });
    } else {
      if (localStorage.getItem('authToken') && localStorage.getItem('authToken') !== null && localStorage.getItem('authToken') !== undefined && localStorage.getItem('language') && localStorage.getItem('language') !== null && localStorage.getItem('language') !== undefined) {
        request = request.clone({
          setHeaders: {
            // 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
          }
        });
      } else {
        request = request.clone({
          setHeaders: {
            // 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('authToken'),
          }
        });
      }
    }
    this.requests.push(request);
    return Observable.create(observer => {
      const subscription = next.handle(request)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              observer.next(event);
            }
          },
          err => {
            console.log('err', err)
            if (err.status === 403) {


              this.toastr.error(err.error?.message, 'Error!');

            } else if (err.status === 500) {
              this.toastr.error(err.error?.message, 'Error!');

            } else {
              if (err.error?.message && err.status !== 404) {
                this.router.navigate(['/login']).then(() => {
                  this.toastr.error(err.error?.message, 'Error!');
                });
              } else {
                if (err.error?.message) {
                  this.toastr.error(err.error?.message, 'Error!');
                }
              }
            }
            return throwError(err);
          },
          () => {
            observer.complete();
          });
      return () => {
        subscription.unsubscribe();
      };
    });

  }
}
