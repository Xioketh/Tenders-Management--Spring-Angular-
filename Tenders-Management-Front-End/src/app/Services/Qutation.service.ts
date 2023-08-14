import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Items } from 'src/app/User/shared/items';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root',
})


export class QuatationService{

    private baseURL = "http://localhost:8080/api/v1/quatations";
    sub:string;

constructor(private _http: HttpClient,private authService:AuthService){}

placeQuatation(item:Items):Observable<Object>{
    return this._http.post(`${this.baseURL}`, item);
}

getQuatation():Observable<Items[]>{
  this.sub=this.authService.getTokenSub()
  return this._http.get<Items[]>(`http://localhost:8080/api/v1/roleQuatations/?role=`+this.sub);
}


getQuatationByRole():Observable<Items[]>{
  return this._http.get<Items[]>(`${this.baseURL}`);
}

placeOrder(item:Items):Observable<Object>{
  return this._http.post(`${this.baseURL}`, item);
}

updateQutationStatus(id: number, status: String): Observable<any> {
  console.log(status)
  return this._http.put(`http://localhost:8080/api/v1/quatations/${id}?Status=${status}`, status);
}

getprice(id: number):Observable<any>{
  return this._http.get<any>(`http://localhost:8080/api/v1/quatations/${id}`);
}

}
