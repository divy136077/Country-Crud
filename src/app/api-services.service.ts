import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, filter, throwError } from 'rxjs';
import { environment } from './environments/environment';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  // login: any;
  getToken(req: HttpRequest<any>, getToken: any): "request" {
    throw new Error('Method not implemented.');
  }
  userLoggedOut() {
    throw new Error('Method not implemented.');
  }
  getUserToken(): string {
    throw new Error('Method not implemented.');
  }


  constructor(public http: HttpClient,) { }
  IsloggedIn() {
    return !!localStorage.getItem("authToken")
  }

  //login API ==================================================================================================================================
  login(obj: any) { return this.http.post<any>(environment.apiURL + '/login', obj) }

  // country API ================================================================================================================================
  getAllData(filter?: any) {
    return this.http.get(environment.apiURL, { params: filter });
  }

  // getProducts(){
  //   return this.http.get(environment.apiURL+'/products');
  // }

  add(obj: any) {
    return this.http.post<any>(environment.apiURL + '/create', obj);
  }


  delete( input:any) {
    return this.http.post<any>(environment.apiURL + `/delete/`, input)
  }

  deleteById( id:any) {
    return this.http.delete<any>(`${environment.apiURL}/delete/${id}`)
  }

  edit(id: any, data: any) {
    return this.http.put(environment.apiURL + `/update/${id}`, data);
  }

  updateSelected(status:any, data:any){
    return this.http.post(environment.apiURL + `/update`, {status,data});
  }

  getByIdCountry(id: any) {
    return this.http.get('http://localhost:8000/' + id)
  }



  // States API ================================================================================================================================
  getAllStateData(filter?: any, name?: any) {
    let obj:any = {}
    !!name && (obj.headers = {countryName:name})
    !!filter && (obj.params = filter)
    // return this.http.get(environment.apiURL + '/state', name ? {headers:{countryName:name} } :{} );
    return this.http.get(environment.apiURL + '/state', obj);


  }
  // getAllStateDataa(name?:any , filter?:any ) {
  //   return this.http.get(environment.apiURL + '/state',{params:filter} );

  // }

  addState(obj: any) {
    return this.http.post<any>(environment.apiURL + '/state/create', obj);
  }


  deleteState(input: any) {
    return this.http.post<any>(environment.apiURL + `/state/delete/`, input
    )
  }
   deleteByIdState( id:any) {
    return this.http.delete<any>(`${environment.apiURL}/state/delete/${id}`)
  }

  editState(id: any, data: any) {
    return this.http.put(environment.apiURL + `/state/update/${id}`, data);
  }
   updateSelectedState(status:any, data:any){
    return this.http.post(environment.apiURL + `/state/update`, {status,data});
  }

  getByIdState(id: any) {
    return this.http.get(environment.apiURL + '/state/' + id)
  }





  // City API =======================================================================================================================================
  getAllCityData(filter?: any, name?:any) {
    let obj:any = {}
    !!name && (obj.headers = {countryName:name})
    !!filter && (obj.params = filter)
    return this.http.get(environment.apiURL + '/city', obj)
  }

  addCity(obj: any) {
    return this.http.post<any>(environment.apiURL + '/city/create', obj);
  }


  deleteCity(input: any) {
    return this.http.post<any>(environment.apiURL + `/City/delete/`,input
    )
  }

  deleteByIdCity( id:any) {
    return this.http.delete<any>(`${environment.apiURL}/City/delete/${id}`)
  }


  editCity(id: any, data: any) {
    return this.http.put(environment.apiURL + `/city/update/${id}`, data);
  }

  updateSelectedCity(status:any, data:any){
    return this.http.post(environment.apiURL + `/city/update`, {status,data});
  }

  getByIdCity(id: any) {
    return this.http.get(environment.apiURL + '/city/' + id)
  }


  // User API =======================================================================================
  // getAllUserData(filter?: any ,  ) {
  //   return this.http.get(environment.apiURL + '/user', { params: filter });
  // }
  getAllUserData( auth?: any, filter?:any ) {
    let obj:any = {}
    auth && (obj.headers = new HttpHeaders().set('auth-token', auth))
    filter && (obj.params = filter)
    return this.http.get(environment.apiURL + '/user', obj);
  }

  addUser(obj: any) {
    return this.http.post<any>(environment.apiURL + '/user/create', obj);
  }

  deleteUser(input: any) {
    return this.http.post<any>(environment.apiURL + `/user/delete/`,input
    )
  }
  deleteByIdUser( id:any) {
    return this.http.delete<any>(`${environment.apiURL}/user/delete/${id}`)
  }

  editUser(id: any, data: any) {
    return this.http.put(environment.apiURL + `/User/update/${id}`, data);
  }
  updateSelectedUser(status:any, data:any){
    return this.http.post(environment.apiURL + `/User/update`, {status,data});
  }


  getByIdUser(id: any) {
    return this.http.get(environment.apiURL + '/user/' + id)
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
