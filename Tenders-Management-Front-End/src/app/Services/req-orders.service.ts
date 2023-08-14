import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root',
})
export class ReqService {
  
  sub:string
  private baseURL = "http://localhost:8080/api/v1/orders";
  // private getReqItems = "http://localhost:8080/api/v1/ReqItems";
  constructor(private _http: HttpClient,  private authService:AuthService) {}

  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/Requorders', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`, data);
  }

  getReqorderList(): Observable<any> {
    return this._http.get<any>('http://localhost:3000/Requorders');
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }


   getReqOrders(): Observable<any>{
    this.sub=this.authService.getTokenSub()
    return this._http.get<any>(`http://localhost:8080/api/v1/placedOrders/?role=`+this.sub);
  }

  getAllReqOrders(): Observable<any>{
    return this._http.get<any>(`http://localhost:8080/api/v1/orders`);
  }


  getRItems(id: number){
    return this._http.get<any>(`http://localhost:8080/api/v1/ReqItems/${id}`);
  }

  geTotOrdersCount(): Observable<any> {
    return this._http.get<any>('http://localhost:8080/api/v1/countRecievedOrders');
  }

  getOrders(): Observable<any> {
    return this._http.get<any>('http://localhost:8080/api/v1/recievedOrder');
  }

  getROrder(id: number){
    return this._http.get<any>(`http://localhost:8080/api/v1/orders/${id}`);
  }

  updateOrderStatus(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8080/api/v1/recievedOrder/${id}`, data);
  }

  getRecievedOrdersByRole(){
    this.sub=this.authService.getTokenSub()
    return this._http.get<any>(`http://localhost:8080/api/v1/getRecievedOrderByRole/?role=`+this.sub);
  }

  getOutstandingByRoleANDStatus(){
    this.sub=this.authService.getTokenSub()
    return this._http.get<any>(`http://localhost:8080/api/v1/getOutstandingByRoleAndStatus/?role=`+this.sub+`&status=No`);
  }

  getOutstandingByRoleANDStatus1(){
    this.sub=this.authService.getTokenSub()
    return this._http.get<any>(`http://localhost:8080/api/v1/getOutstandingByRoleAndStatus/?role=`+this.sub+`&status=Yes`);
  }

  getAcceptedOrders(){
    return this._http.get<any>(`http://localhost:8080/api/v1/accepted`);
  }

  getAllCheques(){
    return this._http.get<any>(`http://localhost:8080/api/v1/outstanding/chequeNotNull`);
  }

  getWaitingDeliverOrders(){
    return this._http.get<any>(`http://localhost:8080/api/v1/null-status`);
  }

  getDeliverdOrders(){
    return this._http.get<any>(`http://localhost:8080/api/v1/not-null-status`);
  }

  

}