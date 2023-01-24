import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // url = "https://c628-117-234-39-140.in.ngrok.io";

  constructor(
    private http:HttpClient
  ) { }


  // login
  loginUser(login: any): Observable<any> {
    return this.http.post<any>(`api/auth/local`, login);
  }

  signupUser(signup:any) : Observable<any> {
    return this.http.post<any>(`api/auth/local/register`, signup);
  }

}
