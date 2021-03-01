import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FolderService } from '../digi-data/folder/folder.service';
import { FilesService } from '../digi-data/folder/files/files.service';


@Injectable({providedIn: 'root'})
export class AuthenticationService {

    user$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
    isLoggedOut: boolean= false;
    constructor(private authService: AngularFireAuth,
                private folderService: FolderService,
                private fileService: FilesService,
                private snackBar: MatSnackBar) { }

    login(email: string, password: string){
        return new Promise<any>((res,rej)=>{
            this.authService.signInWithEmailAndPassword(email, password).then(response=>{
                this.isLoggedOut= false;
                this.user$.next(response.user);
                res(response);
            },err=>{
                this.openSnackBar(err.message,"Close");
                this.user$.next(null);
                return rej(err)
            });
        });
    }

    register(email: string, password: string){
        return new Promise<any>((resolve, reject) => {
            this.authService.createUserWithEmailAndPassword(email, password)
          .then(res => {
            resolve(res);
          }, err => reject(err));
        });
      }

      getCurrentUser(){
        return new Promise<any>((resolve, reject) => {
          this.authService.onAuthStateChanged((user)=>{
            if (user) {
              resolve(user);
              this.user$.next(user);
            } else {
                resolve(user);
                this.user$.next(null);
            }
          })
        })
      }

      isLoggedIn(): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.authService.onAuthStateChanged((user)=>{
                return user ? resolve(true): resolve(false);
            });
        });
      }

      logout(): Promise<boolean>{
        return new Promise((resolve, reject) => {
            if(this.authService.currentUser){
              this.authService.signOut().then(()=>{
                this.isLoggedOut= true;
                this.user$.next(null);
              this.folderService.allFolders$.next([]);
              this.folderService.currentFolder$.next(null);
              this.fileService.allFiles$.next([]);
              resolve(true);
              }).catch(()=>{resolve(false)});
            }
            else{
              resolve(false);
            }
          });
      }

      registerUser(email: string, password: string, displayName: string){
        return new Promise<any>((resolve, reject) => {
          this.authService.createUserWithEmailAndPassword(email,password)
          .then(res => {
            res.user.updateProfile({
                displayName:displayName 
            }).then(()=>{
                resolve(res);
            });
            
          }, err => {
              this.openSnackBar(err.message,"Close");
              return reject(err)
            })
        }).catch(err=>{
           return Promise.reject(err);
        })
      }

      resetPassword(email: string){
        return new Promise<any>((res,rej)=>{
            this.authService.sendPasswordResetEmail(email).then(response=>{
                res(response);
            },err=>{
                this.openSnackBar(err.message,"Close");
                return rej(err)
            });
        });
    }

      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 3000,
        });
      }
    
}