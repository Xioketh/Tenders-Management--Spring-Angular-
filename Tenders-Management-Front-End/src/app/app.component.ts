import { Component } from '@angular/core';

interface SideNavToggle{
  screenWidth:number;
  collasped:boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WinoTradingFrontEnd';

  isSideNavCollapsed=false;
  screenWidth=0;

  onToggleSideNav(data:SideNavToggle):void{
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collasped;

  }


}
