import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OutstandService } from 'src/app/Services/outstand.service';

@Component({
  selector: 'app-outstand',
  templateUrl: './outstand.component.html',
  styleUrls: ['./outstand.component.css']
})
export class OutstandComponent {
  outstandArray:[]
  tot: number=0;

  displayedColumns: string[] = [
    'orderID',
    'role',
    'totAmount'
    ];

    dataSource!: MatTableDataSource<any>;
     @ViewChild(MatPaginator) paginator!: MatPaginator;
     @ViewChild(MatSort) sort!: MatSort;



     constructor(
      private outService:OutstandService)
      {
        this.getOutData();
      }

      getOutData(){
        const value="No"
        // const tot=0;

      this.outService.getOutSpecificData(value).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator; 

          this.outstandArray=res
          // console.log(parseInt(res[0].totAmount))

          for(let i=0; i<res.length; i++){
            this.tot=this.tot+ +res[i].totAmount;
          }
          console.log(this.tot)
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
