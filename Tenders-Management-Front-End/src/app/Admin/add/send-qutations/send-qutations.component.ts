import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { QuatationService } from '../../../Services/Qutation.service';
import { ReqService } from '../../../Services/req-orders.service';
import { Items } from 'src/app/User/shared/items';
import { OrderServiceService } from 'src/app/Services/order-service.service';
import { Order } from 'src/app/User/shared/order';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/AuthService';

@Component({
  selector: 'app-send-qutations',
  templateUrl: './send-qutations.component.html',
  styleUrls: ['./send-qutations.component.css']
})
export class SendQutationsComponent {
  itemz=[];
  quatation=[];
  quatationForm:FormGroup;
  items: Items=new Items();
  order:Order=new Order();
  status:String;
  

  constructor(
    private _dialogRef: MatDialogRef<SendQutationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _quatationService: QuatationService,
    private _reqorders:ReqService,
    private _fb: FormBuilder,
    private _orderService:OrderServiceService,
    private toast: ToastrService,
    private authService:AuthService
  ){
    this.getReqItems();
  }

  form(){
    this.quatationForm=new FormGroup({
      item:new FormControl(""),
      price:new FormControl(""),
      reqOrderId:new FormControl("")

    })
  }

  getReqItems(){
    console.log(this.data.id)

    this._orderService.getReqOrderById(this.data.id).subscribe({
      next: (res) => {
        this.status=res.quatationRecieved;
        this.items.role=res.role
      },
      error: console.log,
    });


    this._reqorders.getRItems(this.data.id).subscribe(data =>{
        this.itemz=data
        console.log(this.itemz)

        //this.quatation=this.itemz
    
    });
  }

  send(){

    console.log(this.quatation[0])

if(this.quatation[0]==null){
  this.toast.error('Please Enter Quantity');
}else{
  this.items.reqOrderId=this.data.id

  //console.log(this.itemz[0].item)

  if(this.status!=="Yes"){
    for(let x=0; x<this.itemz.length; x++){
      this.items.item=this.itemz[x].item
      this.items.price=this.quatation[x]
      this.items.qty=this.itemz[x].qty
      this.saveData(this.items);
    }
  

    this.order.quatationRecieved="Yes";
    this.order.orderStatus=""
    console.log(this.order)
      this._orderService.updateQuatationReciceved(this.data.id, this.order).subscribe({
        next: (val: any) => {
          this.toast.success('Qutation Sent Successful!');
        },
          error: (err: any) => {
          console.error(err);
        },
      });
  }

  else{
    
    this.toast.info('Qutation has already sent!');

  }
}

    
  }

  saveData(i:any){

    console.log(i)
    this._quatationService.placeQuatation(i).subscribe(data =>{
      console.log(data);
      this._dialogRef.close(true);
    },
    error=>console.log(error));  
    
  }

}


            