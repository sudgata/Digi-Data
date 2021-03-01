import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FilesService } from '../digi-data/folder/files/files.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SigninAuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router:Router, private fileService: FilesService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve, reject) => {
        if(this.authService.user$.getValue()){
          resolve(false);
          this.router.navigate(['my-dashboard']);
        }
        else{
          this.authService.getCurrentUser().then((user)=>{
            if(user){
              resolve(false);
              this.router.navigate(['my-dashboard']);
            }else{
              this.fileService.allFiles$.next([]);
              resolve(true);
            }
          });
        }
      })
  }
  
}
