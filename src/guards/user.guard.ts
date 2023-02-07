import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

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
