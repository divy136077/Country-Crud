import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, filter, throwError } from 'rxjs';
import { environment } from './environments/environment';


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


  constructor(public http: HttpClient) { }
  // country API ================================================================================================================================
  getAllData(filter?:any) {
    return this.http.get(environment.apiURL,{params:filter});
  }

  add(obj: any) {
    return this.http.post<any>(environment.apiURL + '/create', obj);
  }

  
  delete(id: any) {
    return this.http.delete<any>(environment.apiURL + `/delete/${id}`
    )
  }
  
  edit(id: any, data: any) {
    return this.http.put(environment.apiURL +`/update/${id}`, data);
  }

  getByIdCountry(id:any){
    return this.http.get('http://localhost:8000/' + id ) 
    }



  // States API ================================================================================================================================
  getAllStateData(name?:any) {
    return this.http.get(environment.apiURL + '/state', name ? {headers:{countryName:name}} :{});
  }

  addState(obj: any) {
    return this.http.post<any>(environment.apiURL +'/state/create', obj);
  }

  
  deleteState(id: any) {
    return this.http.delete<any>(environment.apiURL + `/state/delete/${id}`
    )
  }
  
  editState(id: any, data: any) {
    return this.http.put(environment.apiURL + `/state/update/${id}`, data);
  }

  getByIdState(id:any){
    return this.http.get(environment.apiURL + '/state/' + id ) 
    }





  // City API =======================================================================================================================================
  getAllCityData() {
    return this.http.get(environment.apiURL + '/city')
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
  
  getByIdCity(id:any){
  return this.http.get(environment.apiURL + '/city/' + id ) 
  }


  // User API =======================================================================================
  getAllUserData() {
    return this.http.get(environment.apiURL + '/user');
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

  
  getByIdUser(id:any){
    return this.http.get(environment.apiURL + '/user/' + id ) 
    }

    // Deshboard API ========================================================================================
     getAll() {
    return this.http.get(environment.apiURL + '/dashboard');
  }




}
