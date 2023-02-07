import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): boolean {
    const role = localStorage.getItem('role');
    const isAuthenticate = localStorage.getItem('isAuthenticate');
    if ( role == 'admin' && isAuthenticate == 'true') {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
  
}
