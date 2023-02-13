import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Content } from '../models/content';
import { Quiz, QuizData, QuizResponse } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  // Get content
  public getContent(): Observable<any> {
    return this.http.get<any>(`/api/content-libraries?populate=*`);
  }

  /**
   * getSingleContent
  */
  public getSingleContent(id:string):Observable<any> {
    return this.http.get(`/api/content-libraries/${id}`);
  }

  // File upload api
  public uploadFile(item: any): Observable<any> {
    return this.http.post<any>(`api/upload`, item);
  }

  //Post content
  public postContent(item: any): Observable<Content> {
    return this.http.post<Content>(`api/content-libraries`, item);
  }

  // update content
  public updateContent(id: string, item: any): Observable<any> {
    return this.http.put<any>(`api/content-libraries/${id}`, item);
  }

  // Delete content
  public deleteContent(id: any): Observable<any> {
    return this.http.delete<any>(`api/content-libraries/${id}`);
  }

  // Post course
  public postCourse(item: any): Observable<any> {
    return this.http.post<any>(`api/courses`, item);
  }

  // Get courses
  public getCourses(): Observable<any> {
    return this.http.get<any>(`api/courses?populate=*`);
  }

  // Get courses
  public getSingleCourse(id:string): Observable<any> {
    return this.http.get<any>(`api/courses/${id}`);
  }

  // update courses
  public updateCourse(id: any, item: any): Observable<any> {
    return this.http.put<any>(`api/courses/${id}`, item);
  }

  // Delete course
  public deleteCourse(id: any): Observable<any> {
    return this.http.delete<any>(`api/courses/${id}`);
  }

  /**
   * getQuiz
   */
  public getQuiz(): Observable<QuizData> {
    return this.http.get<QuizData>(`api/quizzes`);
  }

  /**
   * postQuiz
   */
  public postQuiz(item: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`/api/quizzes`, item)
  }

  /**
   * updateQuiz
   */
  public updateQuiz(id: string, item: any): Observable<any> {
    return this.http.put<any>(`/api/quizzes/${id}`, item);
  }

  /**
   * deleteQuiz
   */
  public deleteQuiz(id: string): Observable<any> {
    return this.http.delete<any>(`/api/quizzes/${id}`);
  }


}
