import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpParams, HttpParamsOptions, HttpRequest } from '@angular/common/http';
import { catchError, filter, Observable, Subject, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  Authorization!: string;
  getData() {
    throw new Error('Method not implemented.');
  }
  // data: any;
  getToken(req: HttpRequest<any>, getToken: any): "request" {
    throw new Error('Method not implemented.');
  }
  userLoggedOut() {
    throw new Error('Method not implemented.');
  }
  getUserToken(): string {
    throw new Error('Method not implemented.');
  }


  constructor(public http: HttpClient, private router:Router) { }
  private subject = new Subject<any>();

  sendNumber(data : any){
    this.subject.next({text:data});
  }

  getNumber():Observable<any>{
    return this.subject.asObservable();
  }



  IsloggedIn() {
    return !!localStorage.getItem("authToken")
  }


  //login API ==================================================================================================================================
  login(obj: any) { return this.http.post<any>(environment.apiURL + '/login', obj) }

  getMenuName(auth:any) { return this.http.get(environment.apiURL + '/login/getuser', { headers: new HttpHeaders().set('auth-token', auth) })}

  // country API ================================================================================================================================
  getAllData(auth:any,filter?: any ) {
    // console.log(filter, auth , 'fhuf');
    const headers = new HttpHeaders().set('auth-token', auth);
    const httpParams: HttpParamsOptions = { fromObject: filter } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: headers };
    return this.http.get(environment.apiURL, options ); 
  }
  // { params: filter }


  add(obj: any, auth:string) {
    return this.http.post<any>(environment.apiURL + '/create', obj , { headers: new HttpHeaders().set('auth-token', auth) });
  }

  delete( input:any , auth:string) {
    return this.http.post<any>(environment.apiURL + `/delete/`, input ,{ headers: new HttpHeaders().set('auth-token', auth) } )
  }

  deleteById( id:any , auth:string) {
    return this.http.delete<any>(`${environment.apiURL}/delete/${id}` , { headers: new HttpHeaders().set('auth-token', auth) })
  }

  edit(id: any, data: any , auth:string) {
    return this.http.put(environment.apiURL + `/update/${id}`, data ,{ headers: new HttpHeaders().set('auth-token', auth) } );
  }

  updateSelected(status:any, data:any , auth:string){
    return this.http.post(environment.apiURL + `/update`, {status,data} ,{ headers: new HttpHeaders().set('auth-token', auth) } );
  }

  getByIdCountry(id: any , auth:string) {
    return this.http.get('http://localhost:8000/' + id ,{ headers: new HttpHeaders().set('auth-token', auth) } )
  }



  // States API ================================================================================================================================
  getAllStateData(auth:any,filter?: any,name?:any ) {
    let obj:any = {} 
    !!name ? (obj.headers = {countryName:name}) : (obj.headers = {})
    !!filter && (obj.params = filter)
    !!auth && (obj.headers['auth-token'] = auth)
    //  const headers:any = new HttpHeaders().set('auth-token', auth);
    //  headers.countryName = name
    //  const httpParams: HttpParamsOptions = { fromObject: filter } as HttpParamsOptions;
    //  const options = { params: new HttpParams(httpParams), headers: headers  };
    //  console.log('th', options , headers.country );
    console.log(auth,obj);
    
    return this.http.get(environment.apiURL + '/state', obj);
 

  }

  addState(obj: any , auth:string) {
    return this.http.post<any>(environment.apiURL + '/state/create', obj , { headers: new HttpHeaders().set('auth-token', auth) });
  }


  deleteState(input: any , auth:string) {
    return this.http.post<any>(environment.apiURL + `/state/delete/`, input , { headers: new HttpHeaders().set('auth-token', auth) }
    )
  }
   deleteByIdState( id:any , auth:string) {
    return this.http.delete<any>(`${environment.apiURL}/state/delete/${id}`, { headers: new HttpHeaders().set('auth-token', auth) })
  }

  editState(id: any, data: any , auth:any) {
    return this.http.put(environment.apiURL + `/state/update/${id}`, data , { headers: new HttpHeaders().set('auth-token', auth) });
  }
   updateSelectedState(status:any, data:any , auth:string){
    return this.http.post(environment.apiURL + `/state/update`, {status,data} , { headers: new HttpHeaders().set('auth-token', auth) });
  }

  getByIdState(id: any , auth:string) {
    console.log(id)
    return this.http.get(environment.apiURL + '/state/' + id ,{ headers: new HttpHeaders().set('auth-token', auth) })
  }





  // City API =======================================================================================================================================
  getAllCityData(auth:any ,filter?: any,name?:any) {
    //  console.log(filter, auth , 'fhuf');
     const headers:any = new HttpHeaders().set('auth-token', auth);     
     const httpParams: HttpParamsOptions = { fromObject: filter } as HttpParamsOptions;
     const options = { params: new HttpParams(httpParams), headers: headers };
    return this.http.get(environment.apiURL + '/city', options )
  }

  // getAllCityData(filter?: any, name?:any) {
  //   let obj:any = {}
  //   !!name && (obj.headers = {countryName:name})
  //   !!filter && (obj.params = filter)
  //   return this.http.get(environment.apiURL + '/city', obj)
  // }

  addCity(obj: any, auth:string) {
    return this.http.post<any>(environment.apiURL + '/city/create', obj , { headers: new HttpHeaders().set('auth-token', auth) });
  }


  deleteCity(input: any , auth:string) {
    return this.http.post<any>(environment.apiURL + `/City/delete/`,input , { headers: new HttpHeaders().set('auth-token', auth) }
    )
  }

  deleteByIdCity( id:any , auth:string) {
    return this.http.delete<any>(`${environment.apiURL}/City/delete/${id}` , { headers: new HttpHeaders().set('auth-token', auth) })
  }


  editCity(id: any, data: any , auth:string) {
    return this.http.put(environment.apiURL + `/city/update/${id}`, data , { headers: new HttpHeaders().set('auth-token', auth) });
  }

  updateSelectedCity(status:any, data:any , auth:string){
    return this.http.post(environment.apiURL + `/city/update`, {status,data} , { headers: new HttpHeaders().set('auth-token', auth) });
  }

  getByIdCity(id: any , auth:string) {
    return this.http.get(environment.apiURL + '/city/' + id , { headers: new HttpHeaders().set('auth-token', auth) })
  }


  // User API =======================================================================================

  getAllUserData( auth?: any, filter?:any ) {
    let obj:any = {}
    auth && (obj.headers = new HttpHeaders().set('auth-token', auth))
    filter && (obj.params = filter)
    return this.http.get(environment.apiURL + '/user', obj);
  }

  addUser(obj: any) {
    return this.http.post<any>(environment.apiURL + '/user/create', obj);
  }

  deleteUser(input: any , auth:string) {
    return this.http.post<any>(environment.apiURL + `/user/delete/`,input , { headers: new HttpHeaders().set('auth-token', auth) }
    )
  }
  deleteByIdUser( id:any , auth:any) {
    return this.http.delete<any>(`${environment.apiURL}/user/delete/${id}`, { headers: new HttpHeaders().set('auth-token', auth) })
  }

  editUser(id: any,data:any,  auth:string) {
    return this.http.put(environment.apiURL + `/User/update/${id}`,data , { headers: new HttpHeaders().set('auth-token', auth) } );
  }
  updateSelectedUser(status:any, data:any , auth:string){
    return this.http.post(environment.apiURL + `/User/update`, {status,data} , { headers: new HttpHeaders().set('auth-token', auth)});
  }


  getByIdUser(id: any , auth:string) {
    return this.http.get(environment.apiURL + '/user/' + id , { headers: new HttpHeaders().set('auth-token', auth) })
  }

  //menu mapping =============================================================

  getMenuMappingList(){
    return this.http.get(environment.apiURL + '/menu/')
  }
  getMenuId(id: any, data: any) {
    return this.http.post(environment.apiURL + `/User/menu/${id}`, data);
  }

  // Deshboard API ========================================================================================
  getAll() {
    return this.http.get(environment.apiURL + '/dashboard');
  }


}
