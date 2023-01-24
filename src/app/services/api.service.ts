import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Content } from '../models/content';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // url = "https://c628-117-234-39-140.in.ngrok.io";

  constructor(
    private http: HttpClient
  ) { }

  getContent() : Observable<any>{
    return this.http.get<any>(`/api/content-libraries?populate=*`);
  }

  postContent(): Observable<Content> {
    return this.http.get<Content>(`api/content-libraries`);
  }
}
