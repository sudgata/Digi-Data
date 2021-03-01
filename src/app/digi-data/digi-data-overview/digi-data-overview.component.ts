import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CreateNewFolderComponent } from '../create-new-folder/create-new-folder.component';
import { FilesService } from '../folder/files/files.service';
import { FolderService } from '../folder/folder.service';
import { Folder } from '../folder/models/folder';

@Component({
  selector: 'app-digi-data-overview',
  templateUrl: './digi-data-overview.component.html',
  styleUrls: ['./digi-data-overview.component.scss']
})
export class DigiDataOverviewComponent implements OnInit, OnDestroy  {

  subscriptions: Subscription[]=[];
  currentFolderId: string;
  currentFolder: Folder;
  currentPath: Folder[];
  showRoot: boolean= false;
  breadcrumbPath$: BehaviorSubject<Folder[]>=new BehaviorSubject<Folder[]>([]);
  fileInput: FormControl= new FormControl();
  constructor(public authenticationService: AuthenticationService,
              private matdialog: MatDialog,
              private route: ActivatedRoute,
              private folderservice: FolderService,
              public fileService: FilesService,
              private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscriptions.push(this.folderservice.currentFolder$.subscribe((folder)=>{
      this.currentFolder= JSON.parse(JSON.stringify(folder));
      if(folder){
        this.showRoot=true;
      }
      else{
        this.showRoot=false;
      }
      if(this.currentFolder?.path?.length>0 ){
          this.breadcrumbPath$.next([...this.currentFolder.path]);
      }
      else{
        this.breadcrumbPath$.next([])
      }
      this.currentPath=this.preparePath(this.currentFolder);
      this.cdref.detectChanges();
    }));
  }

  CreateNewFolder(){
    let folder: Folder={
      parentId: this.currentFolder? this.currentFolder.id: null,
      userId: this.authenticationService.user$.getValue()?.uid,
      path: this.currentFolder ? this.currentPath: [],
      isFavourite: false
    }
    const dialogRef=this.matdialog.open(CreateNewFolderComponent,{height:'230px',width:'400px',data:folder});
  }

  preparePath(folder: Folder){
    let path: Folder[]=folder?.path;
    if(this.currentFolder)
      path.push({
        id: this.currentFolder.id,
        name: this.currentFolder.name
      });
      return path;
  }

  handleUpload(event){
    const file= event.target?.files[0];
    const FileSize = file.size / 1024 / 1024; // in MiB
    let filenames= this.fileService.allFiles$.getValue().map(file=>file.name);
    if(filenames.length>0 && filenames.includes(file?.name)){
      this.fileInput.reset();
      this.fileService.openSnackBar("File already uploaded in this folder !","Close");
      return;
    }
    else if(FileSize>2){
      this.fileInput.reset();
      this.fileService.openSnackBar("File size can't be more than 2 MB !","Close");
      return;
    }
    else{
      const userId= this.authenticationService.user$.getValue()?.uid;
      const folderId = this.currentFolder? this.currentFolder.id: null;
      let path;
      if(!this.currentFolder){
        path=`/files/${userId}/${file?.name}`;
      }
      else{
        const subfolders= this.currentFolder.path.map(p=>p.id).join('/');
        path=`/files/${userId}/${subfolders}/${file?.name}`; 
      }
      if(file){
        this.fileService.uploadFile(path, file, folderId, userId);
      }
    }
    this.fileInput.reset();
  }

  ngOnDestroy(){
    this.subscriptions?.forEach((sub)=> sub.unsubscribe());
  }
}
