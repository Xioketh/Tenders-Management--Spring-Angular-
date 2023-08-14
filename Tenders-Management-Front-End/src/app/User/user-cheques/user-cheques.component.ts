import { Component,Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CoreService } from 'src/app/Admin/ahome/core.service';
import { OutstandService } from 'src/app/Services/outstand.service';
import { ReqService } from 'src/app/Services/req-orders.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-cheques',
  templateUrl: './user-cheques.component.html',
  styleUrls: ['./user-cheques.component.css']
})
export class UserChequesComponent {

  cid:String="";

  constructor(
    private _fb: FormBuilder,
    private _reqorders: ReqService,
    private _dialogRef: MatDialogRef<UserChequesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private outService:OutstandService,
    private _dialog: MatDialog,
    private toast: ToastrService,
    private location: Location
) {

      // console.log(data)
 
  }

  sendCheque(){
    // console.log(this.cid)
    this.data.chequeId=this.cid
    this.data.status="Yes"
    console.log(this.data)

     this.outService.updateOutStatus(this.data.id, this.data).subscribe({
          next: (val: any) => {
            this.toast.success('Status Updated!');
            window.location.reload();
          },
          error: (err: any) => {
            console.error(err);
          },
        });


  }

}
