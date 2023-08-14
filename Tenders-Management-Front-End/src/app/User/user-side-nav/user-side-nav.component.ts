import { Component, EventEmitter, Output,OnInit,HostListener,Input } from '@angular/core';
import { Injectable } from '@angular/core';
import {navbarData} from './nav-data';


interface SideNavToggle{
  screenWidth:number;
  collasped:boolean;
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-user-side-nav',
  templateUrl: './user-side-nav.component.html',
  styleUrls: ['./user-side-nav.component.css']
})
export class UserSideNavComponent implements OnInit {

  rlink:string='Uorder';
  bool:boolean;

  @Output() onToggleSideNav:EventEmitter<SideNavToggle>=new EventEmitter();
  collapsed=true;
  screenWidth=0;
  navData=navbarData;

constructor() {
  
}

// @HostListener('window:resize',['$event'])
// onResize(event:any){
//   this.screenWidth=window.innerWidth;
//   if(this.screenWidth<=768){
//     this.collapsed=false;
//     this.onToggleSideNav.emit({collasped:this.collapsed,screenWidth:this.screenWidth});
//   }
// }

  ngOnInit():void{
    // this.screenWidth=window.innerWidth;
    // console.log(this.screenWidth);
    // console.log("hi1");
  }

  // closeSidenav():void{
  //   this.collapsed=false;
  //   this.onToggleSideNav.emit({collasped:this.collapsed,screenWidth:this.screenWidth});
  // }

  // toggleCollapse() :void{
  //   this.collapsed=!this.collapsed;
  //   this.onToggleSideNav.emit({collasped:this.collapsed,screenWidth:this.screenWidth});
  // }

}
