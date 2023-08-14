import { Component,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { OutstandService } from 'src/app/Services/outstand.service';
import { ReqService } from 'src/app/Services/req-orders.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-cheques-display',
  templateUrl: './user-cheques-display.component.html',
  styleUrls: ['./user-cheques-display.component.css']
})
export class UserChequesDisplayComponent {

  pdfMake: any;
  currentDate: Date;

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'orderID',
    'chequeId',
    'totAmount',
    "action"
    ];


  constructor(
              private reqService:ReqService,
              private _dialog: MatDialog,
              private datePipe: DatePipe,
              private outService:OutstandService,
              private toast: ToastrService)
    {
      this.getData();
      this.pdfMake = pdfMake;
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }


  getData(){
    this.reqService.getOutstandingByRoleANDStatus1().subscribe({
      next: (res) => {
        console.log(res)
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

  download(data:any){

    console.log(data)


    this.currentDate = new Date()
    const formattedDate = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy');
    
    const documentDefinition = {
      content: [
        { text: 'Wino Trading (Pvt) Limited', style: 'header' },
        { text: formattedDate , style: 'date' },
        // { text: 'Invoice', style: 'body' },
        { text: 'Order ID: '+data.orderID, style: 'body' },
        { text: 'Cheque ID: '+data.chequeId, style: 'body' },
        { text: 'Cheque Amount: '+data.totAmount, style: 'body' },
        { text: 'Thank You for Choosing Us!', style: 'topic' },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [150, 0, 0, 50]
        },
        body: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        table: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        date: {
          fontSize: 14,
          bold: true,
          margin: [400, 0, 0, 10]
        },
        topic: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 10]
        }
      }
    };
  
    pdfMake.createPdf(documentDefinition).download("Cheque for Order ID-"+data.orderID +".pdf");
      
    
  }

}
