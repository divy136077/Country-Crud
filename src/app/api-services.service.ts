import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


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
  getAllData() {
    return this.http.get('http://localhost:8000/');
  }

  add(obj: any) {
    return this.http.post<any>('http://localhost:8000/create', obj);
  }

  
  delete(id: any) {
    return this.http.delete<any>(`http://localhost:8000/delete/${id}`
    )
  }
  
  edit(id: any, data: any) {
    return this.http.put(`http://localhost:8000/update/${id}`, data);
  }

  getByIdCountry(id:any){
    return this.http.get('http://localhost:8000/' + id ) 
    }



  // States API ================================================================================================================================
  getAllStateData(name?:any) {
    return this.http.get('http://localhost:8000/state', name ? {headers:{countryName:name}} :{});
  }

  addState(obj: any) {
    return this.http.post<any>('http://localhost:8000/state/create', obj);
  }

  
  deleteState(id: any) {
    return this.http.delete<any>(`http://localhost:8000/state/delete/${id}`
    )
  }
  
  editState(id: any, data: any) {
    return this.http.put(`http://localhost:8000/state/update/${id}`, data);
  }

  getByIdState(id:any){
    return this.http.get('http://localhost:8000/state/' + id ) 
    }





  // City API =======================================================================================================================================
  getAllCityData() {
    return this.http.get('http://localhost:8000/city')
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

  addCity(obj: any) {
    return this.http.post<any>('http://localhost:8000/city/create', obj);
  }

  
  deleteCity(id: any) {
    return this.http.delete<any>(`http://localhost:8000/City/delete/${id}`
    )
  }
  
  
  editCity(id: any, data: any) {
    return this.http.put(`http://localhost:8000/city/update/${id}`, data);
  }
  
  getByIdCity(id:any){
  return this.http.get('http://localhost:8000/city/' + id ) 
  }


  // User API =======================================================================================
  getAllUserData() {
    return this.http.get('http://localhost:8000/user');
  }

  addUser(obj: any) {
    return this.http.post<any>('http://localhost:8000/user/create', obj);
  }

  deleteUser(id: any) {
    return this.http.delete<any>(`http://localhost:8000/user/delete/${id}`
    )
  }

  editUser(id: any, data: any) {
    return this.http.put(`http://localhost:8000/User/update/${id}`, data);
  }

  
  getByIdUser(id:any){
    return this.http.get('http://localhost:8000/user/' + id ) 
    }





  // private handleError(error: HttpErrorResponse) {
  //   let errorMessage = ''
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `, error.error);
  //     errorMessage = `Backend returned code ${error.status}, body was: `, error.error;
  //   }
  //   // Return an observable with a user-facing error message.
  //   errorMessage += 'Something bad happened; please try again later.'
  //   return throwError(() => new Error(errorMessage));
  // }


}
