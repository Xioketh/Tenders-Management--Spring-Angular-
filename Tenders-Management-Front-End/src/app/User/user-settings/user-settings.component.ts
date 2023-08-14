import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/AuthService';
import { usersService } from 'src/app/Services/users.service';
import { Mail } from '../shared/mail';
import { OrderServiceService } from 'src/app/Services/order-service.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent {

  registerForm:FormGroup;
  verify:FormGroup;
  email=JSON.parse(this.authService.getEmail());
  randomNumber:number
  showAdditionalInput:boolean=false;
  mail:Mail=new Mail();
  sub:string;

  constructor(private _fb: FormBuilder,
    private toastr: ToastrService,
    private _userService: usersService,
    private authService:AuthService,
    private _orderService:OrderServiceService,){
          this.createForm();

}



createForm(){
  this.registerForm=this._fb.group({
    // userName:['',Validators.required],
    // companyName:['',Validators.required],
    // adress:['',Validators.required],
    // email:['',Validators.required,Validators.email],
    // tel:['',Validators.required],
    userPassword:['',Validators.required],
    cPassword:['',Validators.required],
  });

  this.verify=this._fb.group({
    one:[''],
    two:[''],
    three:[''],
    four:[''],
  });


}

generateRandomNumber(): number {
  return Math.floor(1000 + Math.random() * 9000);
}


onSubmit(){
  if(this.registerForm.valid){


    if(this.registerForm.value.userPassword==this.registerForm.value.cPassword){
      this.showAdditionalInput=true
      this.randomNumber=this.generateRandomNumber();
      console.log(this.randomNumber)


      this.mail.sendMail=this.email;
      this.mail.body="Your password Change OTP Verification Code is: \n \n \t"+this.randomNumber+"\n \nThank You";
      this.mail.subject="OTP Verification Code- WinoTrading"

      this._orderService.sendMail(this.mail).subscribe(data =>{
        console.log("email sent")
      },
      error=>console.log(error)); 

    }else{
      this.toastr.error("Passwords are not Same")
    }



  }else{
    this.validateAllFormFileds(this.registerForm)
  }

}


onVerify(){
  console.log(this.randomNumber)
  const combinedNumber = Number(`${this.verify.value.one}${this.verify.value.two}${this.verify.value.three}${this.verify.value.four}`);
console.log(this.registerForm.value.userPassword)
    

    if(this.randomNumber==combinedNumber){
      this.sub=this.authService.getTokenSub();

      this._userService.passwordChange(this.sub, this.registerForm.value).subscribe({
            next: (val: any) => {
              this.toastr.success("Password Changed")
              window.location.reload();
            },
            error: (err: any) => {
              console.error(err);
            },
          });
       
    }else{
      this.toastr.error("Verify Code worng!")
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


}
