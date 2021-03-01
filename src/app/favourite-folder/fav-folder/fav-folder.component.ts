import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FolderService } from 'src/app/digi-data/folder/folder.service';
import { Folder } from 'src/app/digi-data/folder/models/folder';

@Component({
  selector: 'app-fav-folder',
  templateUrl: './fav-folder.component.html',
  styleUrls: ['./fav-folder.component.scss']
})
export class FavFolderComponent implements OnInit, OnDestroy {

  favFolders: Folder[]=[];
  isLoading: boolean= true;
  subscriptions: Subscription[]=[];
  constructor(private folderService: FolderService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    const userId= this.authenticationService.user$.getValue().uid;
    this.subscriptions.push(this.folderService.fetchFavouriteFolders(userId).subscribe((folders)=>{
      this.favFolders=folders;
      this.isLoading=false;
    }));
  }

  removeFromFavourite(folder){
    this.folderService.removeFromFavourite(folder);
  }

  ngOnDestroy(){
    this.subscriptions?.forEach((sub)=> sub.unsubscribe());
  }

}
