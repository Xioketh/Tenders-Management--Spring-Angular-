import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digitalclock',
  templateUrl: './digitalclock.component.html',
  styleUrls: ['./digitalclock.component.css']
})
export class DigitalclockComponent implements OnInit{
private daysArray=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

private date=new Date();

public hour:any;
public minute:String;
public second:String;
public ampm:String;
public day:String;

ngOnInit(): void {
  setInterval(()=>{
    const date=new Date();
    this.updateDate(date);
  },1000); 
  this.day=this.daysArray[this.date.getDay()];
}
private updateDate(date:Date){
  const hours=date.getHours();

  this.ampm=hours>=12?'PM':'AM';

  this.hour=hours % 12;
  this.hour=this.hour?this.hour:12;

  this.hour=this.hour<10?'0'+this.hour:this.hour;

  const minutes=date.getMinutes();
  this.minute=minutes<10?'0'+minutes:minutes.toString();

  const seconds=date.getSeconds();
  this.second=seconds<10?'0'+seconds:seconds.toString();
}
}

