import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private baseURL = "http://localhost:8080/api/v1/suppliers";
  constructor(private _http: HttpClient) {}

  addSupplier(data: any): Observable<any> {
    return this._http.post(`${this.baseURL}`, data);
  }

  updateSupplier(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8080/api/v1/suppliers/${id}`, data);
  }

  getSupplierList(): Observable<any> {
    return this._http.get<any>(`${this.baseURL}`);
  }

  deleteSupplier(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8080/api/v1/suppliers/${id}`);
  }

 
}

