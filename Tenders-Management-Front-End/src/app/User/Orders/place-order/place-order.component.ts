import { Component,OnInit,Input} from '@angular/core';
import { OrderServiceService } from '../../../Services/order-service.service';
import { FormGroup,FormControl,FormArray,FormBuilder, Validators } from '@angular/forms';
import { Order } from '../../shared/order';
import { Router } from '@angular/router';
import { Items } from '../../shared/items';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { RequestedOrderComponent } from '../requested-order/requested-order.component';
import { AuthService } from 'src/app/Services/AuthService';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent {

  userForm:FormGroup;
  addItemsForm:FormGroup;
  public addmore: FormGroup;
  cname=JSON.parse(this.authService.getCompanyname());
  email=JSON.parse(this.authService.getEmail());
  tel=JSON.parse(this.authService.getTell());
  currentDate: Date;

  orders1: Order=new Order();
  items1: Items=new Items();
  public lastId:number;
  rLink:string='Uorder';
  bool:boolean=true;
  x:any;
  item: string;

  constructor(
    private _dialog: MatDialog,
    private orderServiceService: OrderServiceService,
    private _fb: FormBuilder, 
    private router:Router, 
    private toastr: ToastrService,
    private authService:AuthService,
    private datePipe: DatePipe,)
    {   
      this.start();
    }
  
  start(){
    this.createForm();

    this.orderServiceService.getLastId().subscribe(data =>{
      this.items1.reqOrderId=data;
      this.lastId=this.items1.reqOrderId+1;
      console.log("Last id is "+this.lastId)
      this.exportIdValue();
    });  
  }

  exportIdValue(){
    console.log("Last id is12 "+ this.lastId)
  }


  createForm(){
    this.userForm=this._fb.group({
      category:['',[Validators.required,this.selectCategoryValidation]],
      date: ['', [Validators.required, this.futureDateValidator]]
    });

    this.addItemForm();
  }

  addItemForm(){
    this.addItemsForm=this._fb.group({
      item: this._fb.array([
        this._fb.group({
          item:['',Validators.required],
          qty:['',[Validators.required,this.qtyValidator]],

        })
      ])
    })
  }

  addItems(index){
    // const control=<FormArray>this.addItemsForm.controls['item'];
    const control = this.addItemsForm.get('item') as FormArray;
    control.push(
      this._fb.group({
        item:['',Validators.required],
        qty:['',Validators.required],
        
      })
    );

  }


  removeItems(index){
    const control=<FormArray>this.addItemsForm.controls['item'];
    control.removeAt(index);
    console.log(index)

  }


  placeOrder(){
    const order=this.userForm.value;
  }

  getItemControls() {
    return (this.addItemsForm.get('item') as FormArray).controls;
  }

  onSubmit(){

    if(this.userForm.valid){

      if(this.addItemsForm.value.item.length==1){
        this.toastr.error("Please Enter Items!")
      }else{
        const role=this.authService.getTokenSub();
      // console.log(role)
  
      this.orders1.quatationRecieved="No"
      this.orders1.orderStatus=""
      this.orders1.role=role
      this.orders1.companyName=this.cname;
      this.orders1.emailID=this.email;
      this.orders1.phoneNO=this.tel;
      this.orders1.date=this.userForm.value.date
  
      this.orders1.category=this.userForm.value.category
  
      console.log(this.orders1)
  
  
     
      this.orderServiceService.placeOrder(this.orders1).subscribe(data =>{
        console.log(data);
        this.toastr.success("Order Request Sent SucceesFul!")
        this.start();
      },
      error=>console.log(error));
  
  
      for(let i=0; i<=this.addItemsForm.value.item.length-2; i++){
       this.items1.item=this.addItemsForm.value.item[i];
       this.addItemsForm.value.item[i].role=role;
        this.addItemsForm.value.item[i].reqOrderId=this.lastId;
        this.orderServiceService.addItem(this.addItemsForm.value.item[i]).subscribe(data =>{
      },
      error=>console.log(error));
    }
      }
      
    }else{
      this.toastr.error("Please Select Category!")
    }
}


  setPage(){
    this.orderServiceService.getId(this.rLink,this.bool)
  }

  get formArr() {
    return this.addmore.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this._fb.group({
    timeRange:[''],
    learn:[''],
    descripition:[''],
    suggestion:[''],
    });
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  changevalue(e){
    console.log(e.target.value)
  }

  openRequestedOrders(){
    const dialogRef = this._dialog.open(RequestedOrderComponent, {
    });
  }


  qtyValidator(control: FormControl) {
    const qty = control.value;
    if (qty && (!/^\d{1,4}$/.test(qty) || isNaN(Number(qty)))) {
      return { invalidQty: true };
    }
    return null;
  }

  selectCategoryValidation(control: FormControl){
    const cate = control.value;
    if (cate==null) {
      return { invalidCate: true };
    }
    return null;
  }

  futureDateValidator = (control: FormControl) => {
    const selectedDate = control.value;
    // const currentDate = new Date();

    console.log(selectedDate)
    // console.log(currentDate)

    this.currentDate = new Date()
    const formattedDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
  
    if (selectedDate && selectedDate <= formattedDate) {
      console.log(control.value);
      console.log(control.errors);
      return { futureDate: true };
    }
    return null;
  };

}