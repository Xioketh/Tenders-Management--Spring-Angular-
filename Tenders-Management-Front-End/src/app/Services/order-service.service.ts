import { Injectable } from '@angular/core';
import { Details } from '../User/shared/order-details/details';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../User/shared/order';
import { Items } from '../User/shared/items';
import { PlacedOrder } from '../User/shared/placedOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  rlink:string;
  bool:boolean;
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  private baseURL = "http://localhost:8080/api/v1/orders";
  private addItemURL = "http://localhost:8080/api/v1/ReqItems";
  private getLastID = "http://localhost:8080/api/v1/getLastId";

  constructor(private httpClient: HttpClient) { }

  getAll():Details[]{
    return[

      {
        id: 1,
        name: 'My Orders',
        imageUrl: '/assets/imgs/Myorders.png',
      },
      {
        id: 2,
        name: 'Place Order',
        imageUrl: '/assets/imgs/place_order2.gif',
      },
      {
        id: 3,
        name: 'Requested Orders',
        imageUrl: '/assets/imgs/request order.png',
      },
      {
        id: 4,
        name: 'Recieved Quatations',
        imageUrl: '/assets/imgs/quotation.png',
      }
    ]
  }

  getOrders(): Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${this.baseURL}`);
  }

  placeOrder(order: Order):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,order);
   
  }

  getReqOrderById(id:number): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8080/api/v1/orders/${id}`);
  }

  getId(rLink,bool){
    this.rlink=rLink;
    this.bool=bool;
  }

  setrlink(){
    return this.rlink;
  }

  setBool(){
    return this.bool;
  }

  addItem(item:Items):Observable<Object>{
    return this.httpClient.post(`${this.addItemURL}`,item);
  }

  getLastId():Observable<Items[]>{
    return this.httpClient.get<Items[]>(`${this.getLastID}`);
  }

  updateQuatationReciceved(id: number, status: any): Observable<any> {
    return this.httpClient.put(`http://localhost:8080/api/v1/orders/${id}`, status);
  }

  acceptedOrders(porder: PlacedOrder):Observable<Object>{
    return this.httpClient.post(`http://localhost:8080/api/v1/recievedOrder`,porder);
   
  }

  sendMail(data:any):Observable<Object>{
    //console.log(data)
    return this.httpClient.post(`http://localhost:8080/sendmail`,data,{headers: this.requestHeader,});
  }
  
}