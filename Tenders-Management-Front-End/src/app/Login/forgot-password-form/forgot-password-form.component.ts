import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/AuthService';
import { usersService } from 'src/app/Services/users.service';
import { OrderServiceService } from 'src/app/Services/order-service.service';
import { Mail } from 'src/app/User/shared/mail';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css']
})
export class ForgotPasswordFormComponent {

  showVerify:boolean=false
  showAdditionalInput:boolean=false
  userForm:FormGroup;
  passwordForm:FormGroup;
  randomNumber:number
  mail:Mail=new Mail();
  verify:FormGroup;
  sub:string;

  constructor(private _fb: FormBuilder,
    private toastr: ToastrService,
    private _userService: usersService,
    private authService:AuthService,
    private _orderService:OrderServiceService,
    private _dialogRef: MatDialogRef<ForgotPasswordFormComponent>){
          this.createForm();

}

createForm(){
  this.userForm=this._fb.group({
    userName:['',Validators.required],
  });

  this.passwordForm=this._fb.group({
    userPassword:['',Validators.required],
    cPassword:['',Validators.required]
  });

  this.verify=this._fb.group({
    one:[''],
    two:[''],
    three:[''],
    four:[''],
  });
}

  onSubmit(){
    console.log(this.userForm.value.userName)

    
    this._userService.getUsersist(this.userForm.value.userName).subscribe({
      next: (res) => {

        if(res==null){
          console.log(res)
          this.toastr.error("No User Exists!")
          // this.showAdditionalInput=true
          console.log(this.showAdditionalInput)
        }else{
          console.log(res)
          this.mail.sendMail=res.email;
          this.sub=res.userName;
          
          this.toastr.success("User catched!")
          this.showAdditionalInput=true
        }
        
      },
      error: console.log,
    });
    
  }
 
  generateRandomNumber(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }
  

  onVerify(){

    console.log(this.passwordForm.value)

    if(this.passwordForm.value.userPassword==this.passwordForm.value.cPassword){
      this.showAdditionalInput=true
      this.randomNumber=this.generateRandomNumber();
      console.log(this.randomNumber)

      this.mail.body="Your password Change OTP Verification Code is: \n \n \t"+this.randomNumber+"\n \nThank You";
      this.mail.subject="OTP Verification Code- WinoTrading"
      console.log(this.mail)

      this._orderService.sendMail(this.mail).subscribe(data =>{
        console.log("email sent")
        this.showVerify=true
        this.showAdditionalInput=false
      },
      error=>console.log(error)); 

    }else{
      this.toastr.error("Passwords are not Same")
    }
  }

  onUpdate(){
    console.log(this.randomNumber)
  const combinedNumber = Number(`${this.verify.value.one}${this.verify.value.two}${this.verify.value.three}${this.verify.value.four}`);
  console.log(this.passwordForm.value.userPassword)
    

    if(this.randomNumber==combinedNumber){
      this._userService.passwordChange(this.sub, this.passwordForm.value).subscribe({
            next: (val: any) => {
              this.toastr.success("Password Changed")
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
       
    }else{
      this.toastr.error("Verify Code worng!")
    }
  }
}
