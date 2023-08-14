import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    constructor() {}
  
    public setRoles(roles: []) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }

    public getRoles(): [] {
      return JSON.parse(localStorage.getItem('roles'));
    }
  
    public setToken(jwtToken: string) {
      localStorage.setItem('jwtToken', jwtToken);
    }
  
    public getToken(): string {
      return localStorage.getItem('jwtToken');
    }
  
    public clear() {
      localStorage.clear();
    }
  
    public isLoggedIn() {
      return this.getRoles() && this.getToken();
    }

    public getTokenSub(){
      interface DecodedToken {
        sub: string;
      }
      
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwt_decode<DecodedToken>(token);
      const subvalue = decodedToken.sub;

      return subvalue;
    }

    //Save user Data to Local Storage
    public setCompanyname(companyName: []) {
      localStorage.setItem('companyName', JSON.stringify(companyName));
    }

    public setEmail(email: []) {
      localStorage.setItem('email', JSON.stringify(email));
    }

    public setTell(tel: []) {
      localStorage.setItem('tel', JSON.stringify(tel));
    }

    public getCompanyname(): string {
      return localStorage.getItem('companyName');
    }

    public getEmail(): string {
      return localStorage.getItem('email');
    }

    public getTell(): string {
      return localStorage.getItem('tel');
    }
  
  }