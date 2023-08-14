import { Component } from '@angular/core';
import { Details } from 'src/app/User/shared/order-details/details';
import { OrderServiceService } from '../../../Services/order-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {

  detail:Details[]=[];
  constructor(private orderServiceService:OrderServiceService,private route:ActivatedRoute){
    
  }

  ngOnInit(): void{
    this.detail=this.orderServiceService.getAll();
  }
}
