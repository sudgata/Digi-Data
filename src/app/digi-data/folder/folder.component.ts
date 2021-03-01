import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { digiFile } from './files/file';
import { FilesService } from './files/files.service';
import { FolderService } from './folder.service';
import { Folder } from './models/folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[]=[];
  folders:Folder[]=[];
  files: digiFile[]=[];
  userID;
  isFolderLoading:boolean= true;
  isFileLoading: boolean= true;
  constructor( private route: ActivatedRoute,
              private folderservice: FolderService,
              private authenticationService:AuthenticationService,
              private fileService: FilesService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscriptions.push(this.folderservice.allFolders$.subscribe((folders)=>{
      this.folders= folders;
    }));
    this.subscriptions.push(this.fileService.allFiles$.subscribe((files)=>{
      this.files= files;
    }));
    this.userID= this.authenticationService.user$.getValue().uid;
      this.route.params.subscribe((params)=>{
        let folderId= params['id']? params['id']: null;
        if(folderId){
          this.subscriptions.push(this.folderservice.getCurrentFolder(folderId).subscribe());
        }
        else{
          this.folderservice.currentFolder$.next(null);
        }
        this.subscriptions.push(this.folderservice.getContentForCurrentFolder(folderId,this.userID).subscribe(()=>{
          this.isFolderLoading= false;
        }));
        this.subscriptions.push(this.fileService.getAllFiles(folderId,this.userID).subscribe(()=>{
          this.isFileLoading= false;
        }));
      })
  }

  openFile(url: string){
    window.open(url);
  }

  deleteFile(file: digiFile){
    const ref= this.dialog.open(ConfirmDialogComponent,{
      height:'140px',
      width: '400px',
      data: `Do you want to delete ${file.name} ?`
    });

    ref.afterClosed().subscribe((val)=>{
      if(val){
        this.fileService.deleteFile(file);
      }
      else{
        return;
      }
    })
  }

  addtoFavourite(folder: Folder){
    this.folderservice.addtoFavourite(folder);
  }

  removeFromFavourite(folder: Folder){
    this.folderservice.removeFromFavourite(folder);
  }

  ngOnDestroy(){
    this.subscriptions?.forEach((sub)=> sub.unsubscribe());
  }
 
}
