import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { UserMainComponent } from './User/user-main/user-main.component';
import { UserOrdersComponent } from './User/Orders/user-orders/user-orders.component';
import { UserSideNavComponent } from './User/user-side-nav/user-side-nav.component';
import { PlaceOrderComponent } from './User/Orders/place-order/place-order.component';
import { MyOrdersComponent } from './User/Orders/my-orders/my-orders.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RequestedOrderComponent } from './User/Orders/requested-order/requested-order.component';
import { HeaderComponent } from './User/Header/header/header.component';
import { DigitalclockComponent } from './DigitalClock/digitalclock/digitalclock.component';
import { AHomeComponent } from './Admin/ahome/ahome.component';
import { AChequeComponent } from './Admin/acheque/acheque.component';
import { ABillComponent } from './Admin/abill/abill.component';
import { AsideNavComponent } from './Admin/aside-nav/aside-nav.component';
import { AdminPageComponent } from './Admin/admin-page/admin-page.component';
import { aHeaderComponent } from './Admin/header/header.component';
import { AdminMainComponent } from './Admin/admin-main/admin-main.component';
import { LoginComponent } from './Login/login/login.component';
import { AsuppliersComponent } from './Admin/asuppliers/asuppliers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddSupplierComponent } from './Admin/add/add-supplier/add-supplier.component';
import { ArequestedOrdersComponent } from './Admin/aRequested-orders/arequested-orders.component';
import { ReqOrdersComponent } from './Admin/add/req-orders/req-orders/req-orders.component';
import { SendQutationsComponent } from './Admin/add/send-qutations/send-qutations.component';
import { UserRequestedOrdersViewComponent } from './User/Orders/requested-order/user-requested-orders-view/user-requested-orders-view.component';
import { RecievedOrdersComponent } from './Admin/recieved-orders/recieved-orders.component';
import { ToastrModule } from 'ngx-toastr';
import { RegisterFormComponent } from './Login/register-form/register-form.component';
import { RecivedQutationsComponent } from './User/Orders/recived-qutations/recived-qutations.component';
import { NgConfirmModule } from 'ng-confirm-box';
import { DatePipe } from '@angular/common';
import { ViewRecievedOrdersComponent } from './Admin/add/view-recieved-orders/view-recieved-orders.component';
import { DeliverGoodsComponent } from './Admin/add/deliver-goods/deliver-goods.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { usersService } from './Services/users.service';
import { AuthGuard } from './Auth/auth.guard';
import { OutstandComponent } from './Admin/outstand/outstand.component';
import { UserOutstandingComponent } from './User/user-outstanding/user-outstanding.component';
import { UserChequesComponent } from './User/user-cheques/user-cheques.component';
import { UserChequesDisplayComponent } from './User/user-cheques/user-cheques-display/user-cheques-display.component';
import { UserSettingsComponent } from './User/user-settings/user-settings.component';
import { ForgotPasswordFormComponent } from './Login/forgot-password-form/forgot-password-form.component';
import { NumericInputDirective } from './User/shared/numeric.directive';

@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    UserMainComponent,
    UserOrdersComponent,
    UserSideNavComponent,
    PlaceOrderComponent,
    MyOrdersComponent,
    RequestedOrderComponent,
    HeaderComponent,
    DigitalclockComponent,
    AHomeComponent,
    AChequeComponent,
    ABillComponent,
    AsideNavComponent,
    AdminPageComponent,
    aHeaderComponent,
    AdminMainComponent,
    LoginComponent,
    AsuppliersComponent,
    AddSupplierComponent,
    ArequestedOrdersComponent,
    ReqOrdersComponent,
    SendQutationsComponent,
    UserRequestedOrdersViewComponent,
    RecievedOrdersComponent,
    RegisterFormComponent,
    RecivedQutationsComponent,
    ViewRecievedOrdersComponent,
    DeliverGoodsComponent,
    ForbiddenComponent,
    OutstandComponent,
    UserOutstandingComponent,
    UserChequesComponent,
    UserChequesDisplayComponent,
    UserSettingsComponent,
    ForgotPasswordFormComponent,
    NumericInputDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatRadioModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgConfirmModule

  ],
  providers: [
    DatePipe,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    usersService,
    Location
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }

 