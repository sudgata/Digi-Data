import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/firestore';
import { Folder } from './models/folder';
import * as firebase from 'firebase';
import {map, take, tap} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class FolderService{
    folders: AngularFirestoreCollection<Folder>;
    currentFolder$: BehaviorSubject<Folder>=new BehaviorSubject<Folder>(null);
    allFolders$: BehaviorSubject<Folder[]>=new BehaviorSubject<Folder[]>([]);
    constructor(private db: AngularFirestore, private snackBar: MatSnackBar) { }

    createNewFolder(folder: Folder){
        folder.createdAt = firebase.default.firestore.FieldValue.serverTimestamp()
        return this.db.collection('folders').add(folder);
    }

    getContentForCurrentFolder(parentId, userId){
        this.folders=this.db.collection('folders',ref=>ref.where("parentId","==",parentId).where("userId","==",userId).orderBy('createdAt'));
        return this.folders.snapshotChanges().pipe(
            map(array=>
                array.map((item): Folder=>{ 
                  return ({
                    ...item.payload.doc.data(),
                    id:item.payload.doc.id  
                  }) as Folder}
                )
        ),
        tap((folders)=>{
            this.allFolders$.next(folders);
        }));
    }

    getCurrentFolder(folderId){
        return this.db.collection('folders').doc(folderId).get()
        .pipe(
        map((folder:any)=>({
            ...folder.data(),
            id: folder.id
        }) as Folder),
        tap((res)=>{
            this.currentFolder$.next(res);
        }
        ));
    }

    addtoFavourite(folder: Folder){
        this.db.collection('folders').doc(folder.id).update({isFavourite: true}).then(()=>{
            this.openSnackBar("Added to Favouries !", "Close")
        });
    }

    removeFromFavourite(folder: Folder){
        this.db.collection('folders').doc(folder.id).update({isFavourite: false}).then(()=>{
            this.openSnackBar("Removed from Favouries !", "Close")
        });
    }

    fetchFavouriteFolders(userId){
        this.folders=this.db.collection('folders',ref=>ref.where("userId","==",userId).where("isFavourite","==",true).orderBy('createdAt'));
        return this.folders.snapshotChanges().pipe(
            map(array=>
                array.map((item): Folder=>{ 
                  return ({
                    ...item.payload.doc.data(),
                    id:item.payload.doc.id  
                  }) as Folder}
                )
        ),
        );
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 3000,
        });
      }
    
}