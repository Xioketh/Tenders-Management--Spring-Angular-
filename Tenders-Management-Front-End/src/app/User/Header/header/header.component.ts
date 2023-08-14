import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/AuthService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  name:string;
  constructor(private router:Router,private authService:AuthService){

    this.getUserName();
  }

  
  logout(){
    this.router.navigateByUrl('login');
    this.authService.clear();
  }

  getUserName(){
   this.name= this.authService.getTokenSub();
  }

}
