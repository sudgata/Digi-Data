import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';

const routes: Routes = [
  {path:'', loadChildren: ()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule)},
  {path:'my-dashboard', loadChildren: ()=>import('./digi-data/digi-data.module').then(m=>m.DigiDataModule),
  canActivate: [AuthGuard]},
  {path: 'favourites', loadChildren: ()=>import('./favourite-folder/favourite-folder.module').then(m=>m.FavouriteFolderModule),
  canActivate: [AuthGuard]},
  {path: '**', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
