import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DigiDataRoutingModule } from './digi-data-routing.module';
import { DigiDataOverviewComponent } from './digi-data-overview/digi-data-overview.component';
import { FolderComponent } from './folder/folder.component';
import { CreateNewFolderComponent } from './create-new-folder/create-new-folder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [DigiDataOverviewComponent, FolderComponent, CreateNewFolderComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    DigiDataRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class DigiDataModule { }
