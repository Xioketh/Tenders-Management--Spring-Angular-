import { Component} from '@angular/core';
import { OutstandService } from 'src/app/Services/outstand.service';
import { ReqService } from 'src/app/Services/req-orders.service';


@Component({
  selector: 'app-ahome',
  templateUrl: './ahome.component.html',
  styleUrls: ['./ahome.component.css']
})
export class AHomeComponent {
  waiting:string;
  deliverd:string;
  count:number;
  tot: number=0;

  constructor(
    private _reqorders: ReqService,private outService:OutstandService

   )
    {

      this.getTotCountOrders();
}



  getTotCountOrders(){
    this._reqorders.geTotOrdersCount().subscribe({
      next: (res) => {
        console.log(res)
        this.count=res;
      },
      error: console.log,
    });

    this._reqorders.getWaitingDeliverOrders().subscribe({
      next:(res)=>{

        if(res==null){
          this.waiting="0";
        }else{
          this.waiting=res.length
        }
        
      }
    })

    this._reqorders.getDeliverdOrders().subscribe({
      next:(res)=>{

        if(res==null){
          this.deliverd="0";
        }else{
          this.deliverd=res.length
        }
        
      }
    })

    const value="No"
    this.outService.getOutSpecificData(value).subscribe({
      next: (res) => {

        for(let i=0; i<res.length; i++){
          this.tot=this.tot+ +res[i].totAmount;
        }
        console.log(this.tot)
      },
      error: console.log,
    });


  }
  
}
