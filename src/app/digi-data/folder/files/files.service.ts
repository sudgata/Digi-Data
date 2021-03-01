import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { digiFile } from './file';

@Injectable({providedIn: 'root'})
export class FilesService {
    files: AngularFirestoreCollection<digiFile>;
    allFiles$:BehaviorSubject<digiFile[]>= new BehaviorSubject<digiFile[]>([]);
    isFileUploaded: boolean= false;
    constructor(private storage: AngularFireStorage,
                private db: AngularFirestore,
                private http: HttpClient,
                private snackBar: MatSnackBar) { }
    
    uploadFile(path: string, file: File, folderId: string, userId: string){
        this.isFileUploaded= true;
        this.storage.upload(path,file).then(()=>{
            this.storage.ref(path).getDownloadURL().toPromise().then((url)=>{
                const digiFile: digiFile={
                    name: file?.name,
                    url: url,
                    createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
                    folderId: folderId,
                    userId: userId
                }
                this.db.collection('files').add(digiFile).then(()=>{
                    this.isFileUploaded=false;
                    this.openSnackBar("File Uploaded Successfully !","Close");
                }).catch(()=>{
                    this.isFileUploaded=false;
                    this.openSnackBar("An error occured while uploading the file !","Close");
                });
            });
        }).catch(()=>{
            this.isFileUploaded=false;
            this.openSnackBar("An error occured while uploading the file !","Close");
        });
    }

    getAllFiles(folderId: string, userId: string){
        this.files=this.db.collection('files',ref=>ref.where("folderId","==",folderId).where("userId","==",userId));
        return this.files.snapshotChanges().pipe(
            map(array=>
                array.map((item)=>{ 
                  return ({
                    ...item.payload.doc.data(),
                    id:item.payload.doc.id  
                  }) as digiFile}
                )
        ),
        tap((files)=>{
            this.allFiles$.next(files);
        }));

    }

    deleteFile(file: digiFile){
        return this.db.collection('files').doc(file.id).delete().then(()=>{
            this.storage.storage.refFromURL(file.url).delete().then(()=>{
                this.openSnackBar("File deleted successfully !","Close");
            });
        }).catch(()=>{
            this.openSnackBar("An error occured while deleting the file !","Close");
        });
    }


    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 3000,
        });
      }
}