import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { QuatationService } from 'src/app/Services/Qutation.service';
import { ReqService } from 'src/app/Services/req-orders.service';

@Component({
  selector: 'app-view-recieved-orders',
  templateUrl: './view-recieved-orders.component.html',
  styleUrls: ['./view-recieved-orders.component.css']
})
export class ViewRecievedOrdersComponent {

  out:any;
  items=[];
  orders:any;
  qty:any


  constructor(
    private _reqorders: ReqService,
    private _quatationService: QuatationService,
    private _dialogRef: MatDialogRef<ViewRecievedOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialog
  ) {
    this.out=data;
    this.start();

   console.log(data)
  }


  start(){
    this._reqorders.getROrder(this.out.reqOrderId).subscribe(data =>{
      this.orders=data
      console.log(this.orders.id)
      
  });


    this._quatationService.getprice(this.out.reqOrderId).subscribe(data =>{ 
      this.items=data
      console.log(this.items)
      
    });
  }

  send(){}

}
