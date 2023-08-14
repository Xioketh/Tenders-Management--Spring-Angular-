import { Component,OnInit,ViewChild } from '@angular/core';
import { Order } from '../../shared/order';
import { OrderServiceService } from '../../../Services/order-service.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReqService } from 'src/app/Services/req-orders.service';
import { CoreService } from 'src/app/Admin/ahome/core.service';
import { MatDialog } from '@angular/material/dialog';
import { UserRequestedOrdersViewComponent } from './user-requested-orders-view/user-requested-orders-view.component';
import { AuthService } from 'src/app/Services/AuthService';

@Component({
  selector: 'app-requested-order',
  templateUrl: './requested-order.component.html',
  styleUrls: ['./requested-order.component.css']
})

export class RequestedOrderComponent implements OnInit{

  displayedColumns: string[] = [
    'id',
    // 'companyName',
    // 'items',
    // 'qty',
    // 'emailID',
    // 'phoneNO',
    'date',
    'category',
    'action'
    ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private orderServiceService: OrderServiceService, 
    private router:Router,
    private _dialog: MatDialog,
    private _coreService: CoreService,
    private _reqorders: ReqService,
  
    ) {}

  ngOnInit():void{
    this.getReqOrders();
  }

  getReqOrders(){

    this._reqorders.getReqOrders().subscribe({
      next: (res) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  getReqItems(){
    // console.log(this.reqId)

    // this._reqorders.getRItems(this.reqId).subscribe(data =>{
    //   console.log(data)

    //   for(let i=0; i<data.length; i++){
    //     this.itemz[i]=data[i].item
    //   }

    //  for(let i=0; i<this.itemz.length; i++){
    //     console.log(this.itemz[i])
    //   }

    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewOrder(data: any) {
    const dialogRef = this._dialog.open(UserRequestedOrdersViewComponent, {
      data,
    });
  }

  deleteEmployee(id: number) {
    this._reqorders.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Supplier deleted!', 'done');
        this.getReqOrders();
      },
      error: console.log,
    });
  } 
}
