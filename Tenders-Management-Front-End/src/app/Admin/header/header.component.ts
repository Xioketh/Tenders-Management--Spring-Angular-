import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/AuthService';

@Component({
  selector: 'app-aheader',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class aHeaderComponent {

  constructor(
    private router:Router,
    private authService:AuthService){

  }


  signout(){
    this.router.navigateByUrl('login');
    this.authService.clear();
  }

}
