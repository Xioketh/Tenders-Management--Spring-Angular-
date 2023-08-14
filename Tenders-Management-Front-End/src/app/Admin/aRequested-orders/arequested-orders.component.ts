import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReqOrdersComponent } from '../add/req-orders/req-orders/req-orders.component';
import { ReqService } from '../../Services/req-orders.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../ahome/core.service';
import { SendQutationsComponent } from '../add/send-qutations/send-qutations.component';

@Component({
  selector: 'app-arequested-orders',
  templateUrl: './arequested-orders.component.html',
  styleUrls: ['./arequested-orders.component.css']
})
export class ArequestedOrdersComponent implements OnInit{

  test=[];

  displayedColumns: string[] = [
  'id',
  'companyName',
   'role',
  'emailID',
  'phoneNO',
  'date',
  'category',
  'action'
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _coreService: CoreService,
    private _reqorders: ReqService
  ) {}

  ngOnInit(): void {
    this.getReqOrders();
    this.test[0]="kk";
    this.test[1]="we";
  }

  getReqOrders(){
    this._reqorders.getAllReqOrders().subscribe({
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

  deleteEmployee(id: number) {
    this._reqorders.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Supplier deleted!', 'done');
        this.getReqOrders();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ReqOrdersComponent, {
      data,
    });

    console.log("button clicked "+data)
  }

  sendQutation(data: any) {
    const dialogRef = this._dialog.open(SendQutationsComponent, {
      data,
    });
    // this._dialogRef.close(true);
  }
}
