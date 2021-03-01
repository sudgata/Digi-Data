import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MustMatch } from './passsword-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  isLoading: boolean;
  signupForm: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private service: AuthenticationService) { }

  ngOnInit(): void {
    this.initForm();
  }
  get firstname(){
    return this.signupForm.get('firstname').value;
  }
  get lastname(){
    return this.signupForm.get('lastname').value;
  }
  get email(){
    return this.signupForm.get('email').value;
  }
  get password(){
    return this.signupForm.get('password').value;
  }
  get confirmPassword(){
    return this.signupForm.get('confirmPassword').value;
  }

  initForm(){
    this.signupForm= this.fb.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',Validators.required]
    },{
      validator: MustMatch('password','confirmPassword')
    });
  }

  get signUpFormControl() {
    return this.signupForm.controls;
  }

  registerUser(){
    if(this.signupForm.valid){
      this.isLoading= true;
      this.service.registerUser(this.email,this.password,this.firstname+' '+this.lastname).then(()=>{
        this.isLoading = false;
        this.service.openSnackBar("Registered Successfully !","Close");
        this.router.navigate(['./my-dashboard']);
      }).catch((err)=>{
        this.isLoading= false;
        this.service.openSnackBar(err.message,"Close");
      })
    }
  }

  navigateToLogin(){
    this.router.navigate(['./login']);
  }

}
