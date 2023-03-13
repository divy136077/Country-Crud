import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription, Subject, throwError } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthModel } from '../_models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';

const API_USERS_URL = environment.baseURL + 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `authToken`;


  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userDetail')));
  isLoadingSubject: BehaviorSubject<boolean>;
  userListDataSubject = new Subject();
  userListData$: Observable<any>;


  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userDetail')));
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.userListData$ = this.userListDataSubject.asObservable();
  }

  // public methods
  login(email: string, password: string): Observable<UserModel> {
    return this.http.post<any>(API_USERS_URL + '/login', { email, password }).pipe(map((res: any) => {
      console.log(res)
      if (res && res.status === true) {
        const obj: any = {
          username: res.result.username,
          first_name: res.result.first_name,
          last_name: res.result.last_name,
          id: res.result.id,
          email: res.result.email,
          phone: res.result.phone,
          profile_image: res.result.profile_image
        };
        const langObj: any = {"id":1,"locale":"en","order":1,"name":"English","status":1,"createdAt":"2019-08-02T12:25:34.228Z","updatedAt":"2019-08-02T12:25:34.228Z"}
        localStorage.setItem('userDetail', JSON.stringify(obj));
        localStorage.setItem('authToken', res.result.token);
        localStorage.setItem('language', JSON.stringify(langObj))
        this.currentUserSubject.next(obj);
      }
      return res;
    }));
  }

  logout() {
    localStorage.clear();

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userDetail')));
    this.toastr.success('success', 'logout Successfully');
    this.router.navigateByUrl('/auth/login');
  }
  logouttwo(){
    localStorage.clear();
    var currentdate = new Date();
    var datetime =  currentdate.getFullYear() + "-"
                    + (("0" + (currentdate.getMonth() + 1)).slice(-2))  + "-"
                    + currentdate.getDate() + "T"
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds()+"Z";
    // var url = `https://adfs.corpnet.co.in/adfs/ls?wa=wsignout1.0&wct=${datetime}&wreply=${environment.logoutUrl}`;
    // window.location.assign(url);
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map((res: any) => {
        this.isLoadingSubject.next(false);
        if (res && res.status) {
          return res;
        }
      }),
      catchError((err) => {
        return throwError(err.error);
      }),
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  update(id: any, data: any) {
    return this.http.put<any>(API_USERS_URL + '/' + id, data).pipe(map((user: any) => {
      if (user.code == 200 && user.status) {
        const obj: any = {
          username: user.result.username,
          first_name: user.result.first_name,
          last_name: user.result.last_name,
          id: user.result.id,
          email: user.result.email,
          phone: user.result.phone,
          profile_image: user.result.profile_image
        };
        localStorage.setItem('userDetail', JSON.stringify(obj));
        localStorage.setItem('authToken', user.result.token);
        this.currentUserSubject.next(obj);
      }
      return user;
    }));
  }

  updatePasswordByEmail(email:string, password:string){
    return this.http.put<any>(API_USERS_URL + '/confirm-password/'+email, password) ;
  }

  // private methods
  setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.authToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth.authToken));
      return true;
    }
    return false;
  }

  setUserDetails(token: any) {
    const data: any = jwt_decode(token);
    const obj: any = {
      username: data.device_token.username,
      first_name: data.device_token.first_name,
      last_name: data.device_token.last_name,
      id: data.device_token.id,
      email: data.device_token.email,
      phone: data.device_token.phone
    };
    localStorage.setItem('userDetail', JSON.stringify(obj));
    localStorage.setItem('authToken', token);
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userDetail')));
  }

  private getAuthFromLocalStorage() {
    try {
      const authData =
        localStorage.getItem(this.authLocalStorageToken);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  displayLoader(value: boolean) {
    this.isLoadingSubject.next(value);
  }

  setUserListData(data) {
    // this.userListDataSubject.next(data);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

