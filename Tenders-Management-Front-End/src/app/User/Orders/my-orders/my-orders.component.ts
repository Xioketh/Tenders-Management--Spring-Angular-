import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReqService } from 'src/app/Services/req-orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  countRows:number
  displayedColumns: string[] = [
    'orderID',
    "reqOrderId",
    'placedDate',
    'totAmount',
    "status"
    ];

    dataSource!: MatTableDataSource<any>;
     @ViewChild(MatPaginator) paginator!: MatPaginator;
     @ViewChild(MatSort) sort!: MatSort;



     constructor(
      private reqService:ReqService)
      {
        this.getData();
      }

      getData(){
        this.reqService.getRecievedOrdersByRole().subscribe({
          next: (res) => {
            console.log(res)
            this.countRows=res.length
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator; 
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

}
