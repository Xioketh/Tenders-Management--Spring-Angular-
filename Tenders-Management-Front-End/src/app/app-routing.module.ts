import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserHomeComponent } from './User/user-home/user-home.component';
import { UserOrdersComponent } from './User/Orders/user-orders/user-orders.component';
import { MyOrdersComponent } from './User/Orders/my-orders/my-orders.component';
import { PlaceOrderComponent } from './User/Orders/place-order/place-order.component';
import { RequestedOrderComponent } from './User/Orders/requested-order/requested-order.component';
import { LoginComponent } from './Login/login/login.component';
import { aHeaderComponent } from './Admin/header/header.component';
import { AsuppliersComponent } from './Admin/asuppliers/asuppliers.component';
import { AHomeComponent } from './Admin/ahome/ahome.component';
import { AdminMainComponent } from './Admin/admin-main/admin-main.component';
import { ABillComponent } from './Admin/abill/abill.component';
import { ArequestedOrdersComponent } from './Admin/aRequested-orders/arequested-orders.component';
import { RecievedOrdersComponent } from './Admin/recieved-orders/recieved-orders.component';
import { RegisterFormComponent } from './Login/register-form/register-form.component';
import { RecivedQutationsComponent } from './User/Orders/recived-qutations/recived-qutations.component';
import { UserMainComponent } from './User/user-main/user-main.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './Auth/auth.guard';
import { OutstandComponent } from './Admin/outstand/outstand.component';
import { UserOutstandingComponent } from './User/user-outstanding/user-outstanding.component';
import { UserChequesDisplayComponent } from './User/user-cheques/user-cheques-display/user-cheques-display.component';
import { UserSettingsComponent } from './User/user-settings/user-settings.component';
import { AChequeComponent } from './Admin/acheque/acheque.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'login',component:LoginComponent},
  {path:'Admin',component:AdminMainComponent,canActivate:[AuthGuard], data:{roles:['Admin']},
    children:[
      {path:'AreqOrders',component:ArequestedOrdersComponent},
      {path:'Abill',component:ABillComponent},
      {path:'Ahome',component:AHomeComponent},
      {path:'Asupplier',component:AsuppliersComponent},
      {path:'RecievedOrders',component:RecievedOrdersComponent},
      {path:'Aoutsatnding',component:OutstandComponent},
      {path:'Acheques',component:AChequeComponent}
    ]
  },
  {path:'User',component:UserMainComponent,canActivate:[AuthGuard], data:{roles:['User']},
  children:[
    {path:'Uhome',component:UserHomeComponent},
    {path:'Uorder',component:UserOrdersComponent},
    {path:'Uorder/MyOrders',component:MyOrdersComponent},
    {path:'Uorder/RequestOrder',component:PlaceOrderComponent},
    {path:'Uorder/RequestOrder/RequestedOrder',component:RequestedOrderComponent},
    {path:'RecivedQutations',component:RecivedQutationsComponent},
    {path:'Uoutstanding',component:UserOutstandingComponent},
    {path:'Ucheques',component:UserChequesDisplayComponent},
    {path:'Usettings',component:UserSettingsComponent}
    
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
