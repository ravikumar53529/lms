import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  canActivate(): boolean {

    const role = localStorage.getItem('role');
    const isAuthenticate = localStorage.getItem('isAuthenticate');
    if (role == "user" && isAuthenticate == 'true') {
      return true;
    }
    return false;
  }
  
}
