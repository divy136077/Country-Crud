import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  

  constructor(public http: HttpClient) {}
// country API ================================================================================================================================
  getAllData() {
    return this.http.get('http://localhost:8000/');
  }

  add(obj: any) {
    return this.http.post<any>('http://localhost:8000/create', obj);
  }

  edit(id: any, data: any) {
    return this.http.put(`http://localhost:8000/update/${id}`, data);
  }

  delete(id: any){ 
    return this.http.delete<any>(`http://localhost:8000/delete/${id}`
  )}

   // States API ================================================================================================================================
   getAllStateData() {
    return this.http.get('http://localhost:8000/state');
  }

  addState(obj: any) {
    return this.http.post<any>('http://localhost:8000/state/create', obj);
  }

  editState(id: any, data: any) {
    return this.http.put(`http://localhost:8000/state/update/${id}`, data);
  }

  deleteState(id: any){ 
    return this.http.delete<any>(`http://localhost:8000/state/delete/${id}`
  )}

  // City API =======================================================================================================================================
  getAllCityData() {
    return this.http.get('http://localhost:8000/city');
  }

  addCity(obj: any) {
    return this.http.post<any>('http://localhost:8000/city/create', obj);
  }

  editCity(id: any, data: any) {
    return this.http.put(`http://localhost:8000/city/update/${id}`, data);
  }

  deleteCity(id: any){ 
    return this.http.delete<any>(`http://localhost:8000/City/delete/${id}`
  )}


}
