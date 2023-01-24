import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  

  constructor(public http: HttpClient) {}

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


}
