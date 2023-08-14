import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order } from '../../../shared/order';
import { ReqService } from 'src/app/Services/req-orders.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/Admin/ahome/core.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-requested-orders-view',
  templateUrl: './user-requested-orders-view.component.html',
  styleUrls: ['./user-requested-orders-view.component.css']
})
export class UserRequestedOrdersViewComponent implements OnInit{
  reqOrderForm: FormGroup;
  orders:Order[];
  public reqId:number;
  itemz = [];
  qtyz=[];

  displayedColumns: string[] = [
    'item',
    'qty',
    ];

    dataSource!: MatTableDataSource<any>;

  constructor(
    private _fb: FormBuilder,
    private _reqorders: ReqService,
    private _dialogRef: MatDialogRef<UserRequestedOrdersViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private _dialog: MatDialog) {

    this.reqOrderForm = this._fb.group({
      companyName: '',
      Address: '',
      email: '',
      Tell: '',
      Items:'',
      id:"",
      date:"",
    });
  }

  ngOnInit(): void {
    this.reqOrderForm.patchValue(this.data);
    // this.getReqOrders()
    this.reqId=this.reqOrderForm.value.id
    
    this.getReqItems();
  }

  getReqOrders(){
    this._reqorders.getReqOrders().subscribe(data =>{
      this.orders=data;
    });
  }

  getReqItems(){
    console.log(this.reqId)

    this._reqorders.getRItems(this.reqId).subscribe(data =>{
      console.log(data)
      this.dataSource = new MatTableDataSource(data);

      for(let i=0; i<data.length; i++){
        this.itemz[i]=data[i].item
        this.qtyz[i]=data[i].qty
      }

     for(let i=0; i<this.itemz.length; i++){
        console.log(this.itemz[i])
        console.log(this.qtyz[i])
      }

    });
  }
}
