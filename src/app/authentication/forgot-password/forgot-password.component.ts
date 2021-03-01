import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: FormControl=new FormControl('',Validators.required);
  constructor(private authService: AuthenticationService,
              public dialogRef: MatDialogRef<ForgotPasswordComponent>) { }

  ngOnInit(): void {
  }

  resetPassword(){
    if(this.email.valid){
      this.authService.resetPassword(this.email.value).then(()=>{
        this.authService.openSnackBar("A password reset link has been sent to your email address !","Close");
        this.dialogRef.close();
      })
    }
  }

}
