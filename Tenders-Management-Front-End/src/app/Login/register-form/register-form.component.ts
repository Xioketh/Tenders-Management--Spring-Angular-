import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { users } from '../users';
import { ToastrService } from 'ngx-toastr';
import { usersService } from 'src/app/Services/users.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  users: users=new users();
  registerForm:FormGroup;
  
  constructor(private _fb: FormBuilder,
              private toastr: ToastrService,
              private _userService: usersService,
              private _dialogRef: MatDialogRef<RegisterFormComponent>){
    this.createForm();
  }

  createForm(){
    this.registerForm=this._fb.group({
      userName:['',Validators.required],
      companyName:['',Validators.required],
      adress:['',Validators.required],
      email:['',[Validators.required,Validators.email,this.emailDomainValidator]],
      tel:['',[Validators.required,this.telephoneNumberValidator]],
      userPassword:['',Validators.required],
      cPassword:['',Validators.required],
    });

  }


  onSubmit(){

    if(this.registerForm.valid){

          if(this.registerForm.value.userPassword==this.registerForm.value.cPassword){
             this._userService.registerUser(this.registerForm.value).subscribe(data =>{
            this._dialogRef.close(true);
             this.toastr.success("User Register Successful!")
             },
               error=>console.log(error));
          }else{
            alert("Password are not Same!")

            this.registerForm=this._fb.group({
              userPassword:[''],
              cPassword:[''],
            });
          } 

    }else{

      this.validateAllFormFileds(this.registerForm)
      this.toastr.error("Fill the Empty Fields")
    }

   

    // if(this.users.userPassword==this.users.cPassword){

    //   // console.log(this.registerForm.value.cPassword)

    //   this._userService.registerUser(this.users).subscribe(data =>{
    //     // console.log(data);
    //     this._dialogRef.close(true);
    //   },
    //   error=>console.log(error));

    //   

    // }else{
    //   this.toastr.error("Password you Enterd not Same!")

    //   const inputElement2 = document.getElementById("p2") as HTMLInputElement;
    //   const inputElement = document.getElementById("p1") as HTMLInputElement;
    //   inputElement.value = "";
    //   inputElement2.value = "";

    // }
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
