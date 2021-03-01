import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean;
  constructor(private router: Router,
              private fb: FormBuilder,
              public service: AuthenticationService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm();
  }

  get email(){
    return this.loginForm.get('email').value;
  }
  get password(){
    return this.loginForm.get('password').value;
  }

  initForm(){
    this.loginForm= this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login(){
    if(this.loginForm.valid){
      this.isLoading=true;
      this.service.login(this.email,this.password).then(()=>{
        this.isLoading=false;
        this.service.openSnackBar("Logged in Successfully !","Close");
        this.router.navigate(['./my-dashboard'])
      }).catch(()=>{
        this.isLoading=false;
      });
    }
  }

  navigateToSignUp(){
    this.router.navigate(['./register']);
  }

  openForgotPasswordDialog(){
    this.matDialog.open(ForgotPasswordComponent,{height:'230px',width:'400px'});
  }

}
