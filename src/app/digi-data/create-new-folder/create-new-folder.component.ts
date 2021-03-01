import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FolderService } from '../folder/folder.service';
import { Folder } from '../folder/models/folder';

@Component({
  selector: 'app-create-new-folder',
  templateUrl: './create-new-folder.component.html',
  styleUrls: ['./create-new-folder.component.scss']
})
export class CreateNewFolderComponent implements OnInit {

  folderName: FormControl=new FormControl('',Validators.required);
  subscriptions: Subscription[];
  constructor(public dialogRef: MatDialogRef<CreateNewFolderComponent>,
              private folderService: FolderService,
              @Inject(MAT_DIALOG_DATA) public folder: Folder) { }

  ngOnInit(): void {
    
  }

  createFolder(){
    if(this.folderName.valid){
      this.folder.name = this.folderName.value;
      this.folderService.createNewFolder(this.folder).then();
      this.dialogRef.close();
    }
  }

}
