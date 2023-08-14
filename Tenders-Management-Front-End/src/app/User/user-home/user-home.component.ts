import { Component } from '@angular/core';
import { ReqService } from 'src/app/Services/req-orders.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {

  countRows:number
  countRows1:number
  tot: number=0;
  
  constructor(
    private reqService:ReqService)
    {
      this.getData();
    }

  getData(){
    this.reqService.getRecievedOrdersByRole().subscribe({
      next: (res) => {
        console.log(res)
        this.countRows=res.length
      },
      error: console.log,
    });

    this.reqService.getReqOrders().subscribe({
      next: (res) => {
        console.log(res)
        this.countRows1=res.length
      },
      error: console.log,
    });


    this.reqService.getOutstandingByRoleANDStatus().subscribe({
      next: (res) => {
        console.log(res)

        for(let i=0; i<res.length; i++){
          this.tot=this.tot+ +res[i].totAmount;
        }
      },
      error: console.log,
    });
  }
}
