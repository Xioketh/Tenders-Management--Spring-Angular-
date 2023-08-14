import { Component,EventEmitter, Output,OnInit,HostListener,Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { AnavbarData } from './navData';

interface SideNavToggle{
  screenWidth:number;
  collasped:boolean;
}

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.css']
})
export class AsideNavComponent implements OnInit{

  @Output() onToggleSideNav:EventEmitter<SideNavToggle>=new EventEmitter();
  collapsed=true;
  navData=AnavbarData;

  ngOnInit():void{
  }

}
