import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deliver-goods',
  templateUrl: './deliver-goods.component.html',
  styleUrls: ['./deliver-goods.component.css']
})
export class DeliverGoodsComponent {


  constructor(
    private _dialogRef: MatDialogRef<DeliverGoodsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialog
  ) {
   console.log(data)
  }

}
