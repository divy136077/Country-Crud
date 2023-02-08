import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, filter, throwError } from 'rxjs';
import { environment } from './environments/environment';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class ServiceService {
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
    return this.http.put<any>(environment.apiURL + `/delete/`,input
    )
  }

  edit(id: any, data: any) {
    return this.http.put(environment.apiURL + `/update/${id}`, data);
  }

  getByIdCountry(id: any) {
    return this.http.get('http://localhost:8000/' + id)
  }



  // States API ================================================================================================================================
  getAllStateData(filter?: any, name?: any) {
    // return this.http.get(environment.apiURL + '/state', name ? {headers:{countryName:name} } :{} );
    return this.http.get(environment.apiURL + '/state', { params: filter });


  }
  // getAllStateDataa(name?:any , filter?:any ) {
  //   return this.http.get(environment.apiURL + '/state',{params:filter} );

  // }

  addState(obj: any) {
    return this.http.post<any>(environment.apiURL + '/state/create', obj);
  }


  deleteState(id: any) {
    return this.http.delete<any>(environment.apiURL + `/state/delete/${id}`
    )
  }

  editState(id: any, data: any) {
    return this.http.put(environment.apiURL + `/state/update/${id}`, data);
  }

  getByIdState(id: any) {
    return this.http.get(environment.apiURL + '/state/' + id)
  }





  // City API =======================================================================================================================================
  getAllCityData(filter?: any) {
    return this.http.get(environment.apiURL + '/city', { params: filter })
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

  addCity(obj: any) {
    return this.http.post<any>(environment.apiURL + '/city/create', obj);
  }


  deleteCity(id: any) {
    return this.http.delete<any>(environment.apiURL + `/City/delete/${id}`
    )
  }


  editCity(id: any, data: any) {
    return this.http.put(environment.apiURL + `/city/update/${id}`, data);
  }

  getByIdCity(id: any) {
    return this.http.get(environment.apiURL + '/city/' + id)
  }


  // User API =======================================================================================
  getAllUserData(filter?: any) {
    return this.http.get(environment.apiURL + '/user', { params: filter });
  }

  addUser(obj: any) {
    return this.http.post<any>(environment.apiURL + '/user/create', obj);
  }

  deleteUser(id: any) {
    return this.http.delete<any>(environment.apiURL + `/user/delete/${id}`
    )
  }

  editUser(id: any, data: any) {
    return this.http.put(environment.apiURL + `/User/update/${id}`, data);
  }


  getByIdUser(id: any) {
    return this.http.get(environment.apiURL + '/user/' + id)
  }

  // Deshboard API ========================================================================================
  getAll() {
    return this.http.get(environment.apiURL + '/dashboard');
  }


}
