import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { OutstandService } from 'src/app/Services/outstand.service';
import { ReqService } from 'src/app/Services/req-orders.service';
import { UserChequesComponent } from '../user-cheques/user-cheques.component';

@Component({
  selector: 'app-user-outstanding',
  templateUrl: './user-outstanding.component.html',
  styleUrls: ['./user-outstanding.component.css']
})
export class UserOutstandingComponent {


  tot: number=0;
  
  displayedColumns: string[] = [
    'orderID',
    'totAmount',
    "action"
    ];

    dataSource!: MatTableDataSource<any>;
     @ViewChild(MatPaginator) paginator!: MatPaginator;
     @ViewChild(MatSort) sort!: MatSort;



     constructor(
      private reqService:ReqService,private _dialog: MatDialog,private outService:OutstandService,private toast: ToastrService)
      {
        this.getData();
      }

      getData(){
        this.reqService.getOutstandingByRoleANDStatus().subscribe({
          next: (res) => {
            console.log(res)
            // this.countRows=res.length
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator; 


            for(let i=0; i<res.length; i++){
              this.tot=this.tot+ +res[i].totAmount;
            }
          },
          error: console.log,
        });

      }

      sendCheque(data){
        console.log(data)
        this.getData();
        const dialogRef = this._dialog.open(UserChequesComponent, {
          data,
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
