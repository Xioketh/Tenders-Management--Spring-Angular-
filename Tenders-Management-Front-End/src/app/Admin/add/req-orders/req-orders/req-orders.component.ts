import { Component,Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/app/Admin/ahome/core.service';
import { ReqService } from '../../../../Services/req-orders.service';
import { Order } from 'src/app/User/shared/order';
import { AddSupplierComponent } from '../../add-supplier/add-supplier.component';
import { SendQutationsComponent } from '../../send-qutations/send-qutations.component';

@Component({
  selector: 'app-req-orders',
  templateUrl: './req-orders.component.html',
  styleUrls: ['./req-orders.component.css']
})
export class ReqOrdersComponent implements OnInit{
  reqOrderForm: FormGroup;
  orders:Order[];
  itemz=[];

  constructor(
    private _fb: FormBuilder,
    private _reqorders: ReqService,
    private _dialogRef: MatDialogRef<ReqOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private _dialog: MatDialog
  ) {
    this.reqOrderForm = this._fb.group({
      companyName: '',
      Address: '',
      email: '',
      Tell: '',
      Items:'',
      date:''
    });
  }

  ngOnInit(): void {
    this.reqOrderForm.patchValue(this.data);
    // this.getReqOrders()
    
    this.getReqItems();
  }

  getReqOrders(){
    this._reqorders.getReqOrders().subscribe(data =>{
      this.orders=data;
     
    });
  }

  sendQutation(data: any) {
    const dialogRef = this._dialog.open(SendQutationsComponent, {
      data,
    });
    this._dialogRef.close(true);
  }

 
  getReqItems(){
    console.log(this.data)

    this._reqorders.getRItems(this.data.id).subscribe(data =>{
      console.log("koo")
      console.log(data)

      this.itemz=data

    //   for(let i=0; i<data.length; i++){
    //     this.itemz[i]=data[i].item
    //   }

    //  for(let i=0; i<this.itemz.length; i++){
    //     console.log(this.itemz[i])
    //   }

    });
  }

}
