import { Component } from '@angular/core';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { usersService } from '../../Services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdminMainComponent } from 'src/app/Admin/admin-main/admin-main.component';
import { AuthService } from 'src/app/Services/AuthService';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ForgotPasswordFormComponent } from '../forgot-password-form/forgot-password-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm:FormGroup;
  pwrd:String
  mail:String
  inputValue:String=''
  inputmail:String=''

  constructor(
        private _dialog: MatDialog,
        private _userService: usersService,
        private toastr: ToastrService,
        private router:Router,
        private authService: AuthService
    ){
    this.createForm();
  }

  registerForm(){
    const dialogRef = this._dialog.open(RegisterFormComponent);
  }

  forgotPasswordForm(){
    const dialogRef = this._dialog.open(ForgotPasswordFormComponent);
  }



  createForm(){
    this.loginForm=new FormGroup({
      userName:new FormControl("", Validators.required),
      userPassword:new FormControl(" ",[Validators.required])
    })
  }

  onSubmit(){
    console.log(this.loginForm.value)

    this._userService.login(this.loginForm.value).subscribe(
      (response: any) => {
        if (response === false) {
          console.log('Data retrieval failed');

        } else {
          this.authService.setRoles(response.user.role);
          this.authService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigateByUrl('/Admin/Ahome');
          this.toastr.info("Hello Admin")
          this.toastr.success("Login Complete!")
        } else {
          this.router.navigateByUrl('/User/Uhome');
          this.toastr.success("Login Complete!")


          this._userService.getUserData(this.loginForm.value.userName).subscribe({
            next: (res) => {
                console.log(res.companyName)

                this.authService.setCompanyname(res.companyName);
                this.authService.setEmail(res.email);
                this.authService.setTell(res.tel);
            },
            error: console.log,
          });

        }
        }
      },
      (err:HttpErrorResponse) => {
        console.log(err.status);
        if(err.status === 401) {
          this.toastr.error("Wrong Data!")
        } else if(err.status === 403) {
            this.router.navigate(['/forbidden']);
        }
        return throwError("Some thing is wrong");
    }
    );
   
  }

  getUserList(data:any) {
    this._userService.getUsersist(data).subscribe({
      next: (res) => {
        console.log(res)

        if(res[0] !=null){
          this.pwrd=res[0].password
          this.mail=res[0].email

            if(this.pwrd==this.loginForm.value.password && this.mail==this.loginForm.value.email){

              if(res[0].role!=="user"){

                localStorage.setItem("data",JSON.stringify(res[0]))
                this.router.navigateByUrl('Admin');
                // this.router.navigateByUrl('Admin/AreqOrders');
                this.toastr.success("Login Complete!")
              }else{
              this.router.navigateByUrl('User');
              this.toastr.success("Login Complete!")
              }
              
            }
            else{
              this.toastr.error("Password Incorrect")
              this.inputValue=''
            }
        }
        else{
          this.toastr.error("Wrong Data")
          this.inputValue=''
          this.inputmail=''
        }
      

      },
      error: console.log,
    });
  }

}
