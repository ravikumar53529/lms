import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserGuard } from 'src/guards/user.guard';


const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  // { path: 'base', loadChildren: () => import('./base/base.module').then(m => m.BaseModule) },
  { path: 'login', loadChildren: () => import('./authentication/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./authentication/signup/signup.module').then(m => m.SignupModule) },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
     canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule),
     canActivate: [UserGuard],
    data: {
      role: 'user'
    },
  },


  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
