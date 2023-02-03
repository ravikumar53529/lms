import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Content } from '../models/content';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(
    private http: HttpClient
  ) { }

  // Get content
  getContent(): Observable<any> {
    return this.http.get<any>(`/api/content-libraries?populate=*`);
  }

  // File upload api
  uploadFile(item: any): Observable<any> {
    return this.http.post<any>(`api/upload`, item);
  }

  //Post content
  postContent(item: any): Observable<Content> {
    return this.http.post<Content>(`api/content-libraries`, item);
  }

  // update content
  updateContent(id: string, item: any): Observable<any> {
    return this.http.put<any>(`api/content-libraries/${id}`, item);
  }

  // Delete content
  deleteContent(id: any): Observable<any> {
    return this.http.delete<any>(`api/content-libraries/${id}`);
  }

  // Post course
  postCourse(item: any): Observable<any> {
    return this.http.post<any>(`api/courses`, item);
  }

  // Get courses
  getCourses(): Observable<any> {
    return this.http.get(`api/courses?populate=*`);
  }

  // update courses
  updateCourse(id: any, item: any): Observable<any> {
    return this.http.put(`api/courses/${id}`, item);
  }

  // Delete course
  deleteCourse(id: any): Observable<any> {
    return this.http.delete<any>(`api/courses/${id}`);
  }
}
