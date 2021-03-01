import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'digi-data';
  isLoggedIn: boolean;
  user: any;
  constructor(private service: AuthenticationService,
              private router: Router){}

  ngOnInit(){
    this.service.user$.subscribe((user)=>{
        this.user = user;
    });
   if(!this.user){
    this.service.getCurrentUser().then((user)=>{
      this.user=user;
    }); 
   }
  }

  logout(){
    this.service.logout().then((res)=>{
      if(res){
        this.router.navigate(['./login']);
        this.service.openSnackBar("Logged out Successfully !","Close");
      }
      else{
        this.service.openSnackBar("There was a problem logging out !","Close");
      }
    });
  }


  navigateToFavourite(){
    this.router.navigate(['./favourites']);
  }

  navigateToHome(){
    this.router.navigate(['./my-dashboard/folder']);
  }
}
