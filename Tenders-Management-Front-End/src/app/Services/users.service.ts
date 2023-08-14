import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { users } from "../Login/users";
import { AuthService } from "./AuthService";

@Injectable({
    providedIn: 'root'
  })


  export class usersService{
    
    requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
    d:any

    constructor(private httpClient: HttpClient,private userAuthService: AuthService) { }

    getUsersist(data:any):Observable<any>{
        return this.httpClient.get<any>(`http://localhost:8080/Users/${data}`,{headers: this.requestHeader,});
    }

    registerUser(data:any):Observable<Object>{
      console.log(data)
      return this.httpClient.post(`http://localhost:8080/registerNewUser`, data,{headers: this.requestHeader,});
  }

    login(data:any):Observable<Object>{
      return this.httpClient.post(`http://localhost:8080/authenticate`, data,{headers: this.requestHeader,});
  }

    passwordChange(id:string,data:any): Observable<any> {
      return this.httpClient.put(`http://localhost:8080/updatePassword/${id}`, data,{headers: this.requestHeader,});
    }

  

  public forUser() {
    return this.httpClient.get(`http://localhost:8080/forUser`, {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpClient.get(`http://localhost:8080/forAdmin`, {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }
  
    return isMatch;
  }


  getUserData(data:any):Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8080/Users/${data}`);
}


  }