import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavFolderComponent } from './fav-folder/fav-folder.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FavFolderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {path: "", component: FavFolderComponent}
    ])
  ]
})
export class FavouriteFolderModule { }
