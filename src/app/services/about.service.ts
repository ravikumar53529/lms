import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from '../models/about-content';
@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private aboutLms = '../../assets/data/about/aboutlms.json';
  constructor(private httpClientRef: HttpClient) {}
  //get aboutlms data
  getAboutLmsData(): Observable<Content[]> {
    return this.httpClientRef.get<Content[]>(this.aboutLms);
  }
}
