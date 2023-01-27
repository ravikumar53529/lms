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

  postContent(item:any): Observable<Content> {
    return this.http.post<Content>(`api/content-libraries`,item);
  }

  updateContent(id:string,item:any) : Observable<any>{
    return this.http.put<any>(`api/content-libraries/${id}`,item);
  }

  deleteContent(id:any) :Observable<any>{
    return this.http.delete<any>(`api/content-libraries/${id}`);
  }
}
