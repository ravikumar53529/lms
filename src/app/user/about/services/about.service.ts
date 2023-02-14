import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from '../../about/interfaces/content';
@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private aboutLms = '../../assets/data/about/aboutlms.json';
  constructor(private httpClientRef: HttpClient) {}
  //get aboutlms dat
  getAboutLmsData(): Observable<Content[]> {
    return this.httpClientRef.get<Content[]>(this.aboutLms);
  }
}
