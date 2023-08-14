import { Component, ViewChild } from '@angular/core';
import { ReqService } from 'src/app/Services/req-orders.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ViewRecievedOrdersComponent } from '../add/view-recieved-orders/view-recieved-orders.component';
import { ToastrService } from 'ngx-toastr';
import { Mail } from 'src/app/User/shared/mail';
import { OrderServiceService } from 'src/app/Services/order-service.service';
import { Outstand } from 'src/app/User/shared/outstanding';
import { OutstandService } from 'src/app/Services/outstand.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { QuatationService } from 'src/app/Services/Qutation.service';

@Component({
  selector: 'app-recieved-orders',
  templateUrl: './recieved-orders.component.html',
  styleUrls: ['./recieved-orders.component.css']
})
export class RecievedOrdersComponent {
 
  count:number;
  out:any;
  cArray:any[]=[];
  mail:Mail=new Mail();
  outstand:Outstand=new Outstand();
  mailAddress:String;
  pdfMake: any;
  id:any;
  currentDate: Date;
  waiting:string;
  deliverd:string;

  displayedColumns: string[] = [
    'orderId',
    'placedDate',
    'reqOrderId',
    'totAmount',
    'action'
    ];

    dataSource!: MatTableDataSource<any>;
     @ViewChild(MatPaginator) paginator!: MatPaginator;
     @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _reqorders: ReqService,
    private _dialog: MatDialog,
    private toast: ToastrService,
    private _orderService:OrderServiceService,
    private outService:OutstandService,
    private _quatationService: QuatationService,
    private datePipe: DatePipe,
   )
    {
      this.pdfMake = pdfMake;
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
      this.getTotCountOrders();
      this.getOrders();
}

  getTotCountOrders(){
    this._reqorders.geTotOrdersCount().subscribe({
      next: (res) => {
        console.log(res)
        this.count=res;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getOrders(){
    this._reqorders.getOrders().subscribe({
      next: (res) => {
        console.log(res)
        this.out=res
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; 
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


  }


  viewOrder(data:any){

      const dialogRef = this._dialog.open(ViewRecievedOrdersComponent, {
        data,
      });

  }


  deliverOrder(data:any){
    this.id=data.orderId

    if(data.status!==null){
      this.toast.info('Order has already Deliverd!');

    }else{

      this._orderService.getReqOrderById(data.reqOrderId).subscribe(data =>{
        this.pdfSeen(data);
        this.mail.sendMail=data.emailID;

        this.mail.body="Congratulations! Your Order is on the Way! \n \n \tThank you for choosing Wino Trading(pvt)Limited for your purchase. We are delighted to inform you that your order is now being processed and is on its way to you.\n \nWe would like to express our appreciation for your business and assure you that we are committed to providing you with high-quality products and exceptional customer service. \n \nThank You"

        this.mail.subject="Wino Trading(pvt)Limited"

        this._orderService.sendMail(this.mail).subscribe(data =>{
          console.log("email sent")
        },
        error=>console.log(error));  
      },
      error=>console.log(error));

      
      data.status="Deliverd"
      this._reqorders.updateOrderStatus(data.orderId, data).subscribe({
        next: (val: any) => {
          this.toast.success('Order Deliverd!');
        },
        error: (err: any) => {
          console.error(err);
        },
      });

      //Next coding-Outstand
      this.outstand.role=data.role
      this.outstand.orderID=data.orderId
      this.outstand.totAmount=data.totAmount
      this.outstand.status="No"

      this.outService.placeoutstand(this.outstand).subscribe(data =>{
      },
      error=>console.log(error));
      
    }

  }


  pdfSeen(data:any){

    this.currentDate = new Date()
    const formattedDate = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy');
  

    this._quatationService.getprice(data.id).subscribe(response =>{ 
      // console.log(response)
      const data1=response

      const tableRows = [];
  
    // Create table header
    const headerRow = ['Item', 'Quantity',"Price"];
    tableRows.push(headerRow);
  
    // Create table rows dynamically based on the array length
    for (const item of data1) {
      const row = [item.item, item.qty, item.price];
      tableRows.push(row);
    }
  
    const documentDefinition = {
      content: [
        { text: 'Wino Trading (Pvt) Limited', style: 'header' },
        { text: formattedDate , style: 'date' },
        // { text: 'Invoice', style: 'body' },
        { text: 'Order ID: '+this.id, style: 'body' },
        { text: 'Company Name: '+data.companyName, style: 'body' },
        { text: 'Email: '+data.emailID, style: 'body' },
        { text: 'Items List: ', style: 'topic' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'],
            body: tableRows
          },style: 'table'
        },
        { text: 'Thank You for Choosing Us!', style: 'topic' },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [150, 0, 0, 50]
        },
        body: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        table: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        date: {
          fontSize: 14,
          bold: true,
          margin: [400, 0, 0, 10]
        },
        topic: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 10]
        }
      }
    };
  
    pdfMake.createPdf(documentDefinition).download("Invoice Order ID-"+this.id +".pdf");
      
    });

  }

}