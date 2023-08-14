import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReqService } from 'src/app/Services/req-orders.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-acheque',
  templateUrl: './acheque.component.html',
  styleUrls: ['./acheque.component.css']
})
export class AChequeComponent {
  pdfMake: any;
  id:any
  currentDate: Date;
  displayedColumns: string[] = [
    'chequeId',
    'orderID',
     'role',
    'totAmount',
    // 'date',
    // 'category',
    ];

    dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private _dialog: MatDialog,
    private _reqorders: ReqService,
    private datePipe: DatePipe,
    
  ) {
    this.getData();
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }



  getData(){
    this._reqorders.getAllCheques().subscribe({
      next: (res) => {
        
        this.id=res
        console.log(this.id)
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


  download(){
    this.currentDate = new Date()
    const formattedDate = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy');
  
       console.log(this.id)

      const tableRows = [];
  
    // Create table header
    const headerRow = ['Order ID', 'Cheque ID',"User Name","Cheque Amount"];
    tableRows.push(headerRow);
  
    // Create table rows dynamically based on the array length
    for (const item of this.id) {
      if (item) { // Check if the item is not undefined
        const row = [item.orderID, item.chequeId, item.role, item.totAmount];
        tableRows.push(row);
      }else{

        console.log("hi")
      }
    }
  
    const documentDefinition = {
      content: [
        { text: 'Wino Trading (Pvt) Limited', style: 'header' },
        { text: formattedDate , style: 'date' },
        // { text: 'Invoice', style: 'body' },
        { text: 'Cheque List', style: 'body' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*','*','*'],
            body: tableRows
          },style: 'table'
        },
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
          fontSize: 8,
          bold: true,
          margin: [0, 0, 0, 0]
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
  
    pdfMake.createPdf(documentDefinition).download("Cheque List.pdf");
      

  }
}

