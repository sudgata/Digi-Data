import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigiDataOverviewComponent } from './digi-data-overview/digi-data-overview.component';
import { FavFolderComponent } from '../favourite-folder/fav-folder/fav-folder.component';
import { FolderComponent } from './folder/folder.component';

const routes: Routes = [
    {path:'',children:[
      {path:'', redirectTo:'folder', pathMatch:'full'},
      {path:'folder', component: FolderComponent},
      {path:'folder/:id', component: FolderComponent},
      {path: 'favouites', component: FavFolderComponent}
    ],
     component: DigiDataOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigiDataRoutingModule { }
