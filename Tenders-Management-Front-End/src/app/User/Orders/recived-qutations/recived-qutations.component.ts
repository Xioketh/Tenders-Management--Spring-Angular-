import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QuatationService } from 'src/app/Services/Qutation.service';
import { Items } from '../../shared/items';
import { ToastrService } from 'ngx-toastr';
import { OrderServiceService } from 'src/app/Services/order-service.service';
import { Order } from '../../shared/order';
import { DatePipe } from '@angular/common';
import { PlacedOrder } from '../../shared/placedOrder';
import { ReqService } from 'src/app/Services/req-orders.service';
import { AuthService } from 'src/app/Services/AuthService';

@Component({
  selector: 'app-recived-qutations',
  templateUrl: './recived-qutations.component.html',
  styleUrls: ['./recived-qutations.component.css']
})
export class RecivedQutationsComponent {
  
  itemz=[];
  items: Items=new Items();
  order:Order=new Order();
  currentDate: Date;
  placedOrder: PlacedOrder=new PlacedOrder();
  tot:number=0;

  displayedColumns: string[] = [
    'reqOrderId',
    'item',
    'price',
    // 'qty',
    'action'
    ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;




constructor(
  private _quatationService:QuatationService,
  private toaker:ToastrService,
  private _orderService:OrderServiceService,
  private datePipe: DatePipe,
  private authService:AuthService
  ){
  this.getquatations();
 
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getquatations(){
    this.tot=0;
    this._quatationService.getQuatation().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        for(let i=0; i<res.length; i++){
            this.itemz[i]=res[i]
        }
        console.log(this.itemz)

        
      },
      error: console.log,
    });
  }

  AcceptQutation(i){
    this.tot=0;
    this._quatationService.getprice(this.itemz[i].reqOrderId).subscribe(data =>{
      console.log(data)
 
       for(let i=0; i<data.length; i++){
         this.tot+=Number(data[i].price)
       } 
 
       this.placedOrder.totAmount=this.tot.toString();
       console.log(this.placedOrder.placedDate)
       console.log(this.placedOrder.reqOrderId)
       console.log(this.placedOrder.totAmount)

       if(this.itemz[i].status==null ){
      console.log("Accepted")
      console.log(this.itemz[i].reqOrderId)

      

      //1
      this._quatationService.updateQutationStatus(this.itemz[i].reqOrderId, "Accepted").subscribe({
        next: (val: any) => {
        },
        error: (err: any) => {
          console.error(err);
        },
      }); 

      //2
      this.order.quatationRecieved="Yes";
      this.order.orderStatus="Accepted"
      console.log(this.order)
      this._orderService.updateQuatationReciceved(this.itemz[i].reqOrderId, this.order).subscribe({
        next: (val: any) => {
          //this.toaker.success('Qutation Sent Successful!');
        },
          error: (err: any) => {
          console.error(err);
        },
      });

      //3
      this._orderService.getReqOrderById(this.itemz[i].reqOrderId).subscribe({
        next: (res) => {
          console.log(res)
        },
        error: console.log,
      });

      this.placeorder();
      this.getquatations();

    }
    else{
      this.toaker.info("Already Answerd")
    } 


     });

    this.currentDate = new Date()
    const formattedDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.placedOrder.placedDate=formattedDate;


    //console.log(this.itemz[i].status);
    this.placedOrder.reqOrderId=this.itemz[i].reqOrderId;
   


    


   // console.log(this.placedOrder.id)

    //console.log( this.placedOrder.totAmount+"1")
    // this.tot+=Number(this.placedOrder.totAmount)
     // console.log(this.tot)
    
   // console.log(this.placedOrder.totAmount)
    
    //console.log(this.placedOrder.totAmount+"l")



    
  }

  DeclineQutation(i){
    if(this.itemz[i].status=="" || this.itemz[i].status==null ){
      console.log("Declined")

      this._quatationService.updateQutationStatus(this.itemz[i].reqOrderId, "Declined").subscribe({
        next: (val: any) => {
          this.toaker.success("Qutation Declined!")
          this.getquatations();
        },
        error: (err: any) => {
          console.error(err);
        },
      });

      this.order.orderStatus="Declined"
      this._orderService.updateQuatationReciceved(this.itemz[i].reqOrderId, this.order).subscribe({
        next: (val: any) => {
          //this.toaker.success('Qutation Sent Successful!');
          console.log("declined123")
        },
          error: (err: any) => {
          console.error(err);
        },
      });

    }
    else{
      this.toaker.info("Already Answerd")
    } 
  }

  placeorder(){
  //this.placedOrder.status=""
    this.placedOrder.role=this.authService.getTokenSub();

    this._orderService.acceptedOrders(this.placedOrder).subscribe(data =>{
      console.log(data);
      this.toaker.success("Order Placed Successfully")
      this.toaker.info("Order email sent to the Seller")
      //this.getquatations();
    },
    error=>console.log(error));
  }
}
