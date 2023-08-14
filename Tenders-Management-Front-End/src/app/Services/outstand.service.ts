import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutstandService {

  constructor(private _http: HttpClient) { }


  placeoutstand(data:any):Observable<Object>{
    return this._http.post(`http://localhost:8080/api/v1/outstand`, data);
  }

  getOutAllData(): Observable<any>{
    return this._http.get<any>('http://localhost:8080/api/v1/outstand');
  }

  getOutSpecificData(value:string): Observable<any>{
    console.log(value)
    return this._http.get<any>(`http://localhost:8080/api/v1/getSelectedOutstand/?status=`+value);
  }

  updateOutStatus(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8080/api/v1/updateOutStatus/`+id, data);
  }
  
}
