import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSupplierComponent } from '../add/add-supplier/add-supplier.component';
import { SupplierService } from '../add/add-supplier/supplier.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../ahome/core.service';
import { ToastrService } from 'ngx-toastr';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-asuppliers',
  templateUrl: './asuppliers.component.html',
  styleUrls: ['./asuppliers.component.css']
})


export class AsuppliersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'address',
    'email',
    'tell',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _supService: SupplierService,
    private _coreService: CoreService,
    private toaker: ToastrService,
    private confirmService: NgConfirmService
  ) {}

  ngOnInit(): void {
    this.getSupplierList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddSupplierComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSupplierList();
        }
      },
    });
  }

  getSupplierList() {
    this._supService.getSupplierList().subscribe({
      next: (res) => {
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

  deleteSup(id: number) {

    this.confirmService.showConfirm("Are you sure",
    ()=>{
      this._supService.deleteSupplier(id).subscribe({
        next: (res) => {
          // this._coreService.openSnackBar('Supplier deleted!', 'done');
          this.toaker.success("Supplier Deleted!")
          this.getSupplierList();
        },
        error: console.log,
      });
    },
    ()=>{
      this.toaker.success("Supplier !")
    }
    )

    
     
          
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddSupplierComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSupplierList();
        }
      },
    });
  }
}
function afterClosed() {
  throw new Error('Function not implemented.');
}

