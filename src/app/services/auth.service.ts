import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "https://thick-mails-walk-157-38-137-211.loca.lt";

  constructor(
    private http:HttpClient
  ) { }


  // login
  loginUser(login: any): Observable<any> {
    return this.http.post<any>(`${this.url}/api/auth/local`, login);
  }

  signupUser(signup:any) : Observable<any> {
    return this.http.post<any>(`${this.url}/api/auth/local/register`,signup);
  }

}
