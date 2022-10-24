import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    canActivate: [ AuthGuard],
    data: { authGuardPipe : redirectLoggedInToHome},
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    canActivate: [ AuthGuard],
    data: { authGuardPipe : redirectLoggedInToHome},
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    canActivate: [ AuthGuard],
    data: { authGuardPipe : redirectUnauthorizedToLogin},
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'download',
    canActivate: [ AuthGuard],
    data: { authGuardPipe : redirectUnauthorizedToLogin},
    loadChildren: () => import('./download/download.module').then( m => m.DownloadPageModule)
  },
  {
    path: 'upload',
    canActivate: [ AuthGuard],
    data: { authGuardPipe : redirectUnauthorizedToLogin},
    loadChildren: () => import('./upload/upload.module').then( m => m.UploadPageModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload/upload.module').then( m => m.UploadPageModule)
  },
  {
    path: 'download',
    loadChildren: () => import('./download/download.module').then( m => m.DownloadPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
