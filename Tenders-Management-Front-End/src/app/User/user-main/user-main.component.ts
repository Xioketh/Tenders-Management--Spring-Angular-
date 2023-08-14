import { Component,Input } from '@angular/core';


interface SideNavToggle{
  screenWidth:number;
  collasped:boolean;
}
@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent {
 
constructor(){
  
}
  @Input() collapsed=false;
  @Input() screenWidth=0;

  getBodyClass():string{
    let styleClass='';
    if(this.collapsed && this.screenWidth>768){
      styleClass='body-trimmed';
      console.log("hi")
    }
    else if(this.collapsed && this.screenWidth<=768 && this.screenWidth>0){
      styleClass='body-md-screen'
      console.log("hi3")
    }
    return styleClass;
  }

  isSideNavCollapsed=false;
  // screenWidth=0;

  onToggleSideNav(data:SideNavToggle):void{
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collasped;

  }
}
