import { Component,Inject, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../ahome/core.service';
import { SupplierService } from './supplier.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _supService: SupplierService,
    private _dialogRef: MatDialogRef<AddSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private toastr: ToastrService,
  ) {
    this.empForm = this._fb.group({
      name: ['',Validators.required],
      address:['',Validators.required],
      email: ['',[Validators.required,Validators.email,this.emailDomainValidator]],
      tell: ['',[Validators.required,this.telephoneNumberValidator]],
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    console.log(this.data)
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._supService.updateSupplier(this.data.id, this.empForm.value).subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Supplier detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._supService.addSupplier(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Supplier added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }else{
      this.validateAllFormFileds(this.empForm)
      this.toastr.error("Fill the Empty Fields")
    }
  }

  private validateAllFormFileds(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control=formGroup.get(field);

      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFileds(control)
      }
    })
  }

  emailDomainValidator(control: FormControl) {
    const email = control.value;
    if (email && !email.endsWith('.com')) {
      return { invalidDomain: true };
    }
    return null;
  }

  telephoneNumberValidator(control: FormControl) {
    const telNumber = control.value;
    if (telNumber && !/^\d{10}$/.test(telNumber)) {
      return { invalidTelNumber: true };
    }
    return null;
  }
}
