import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Upcomingclasses} from '../models/upcoming-classes'
@Injectable({
  providedIn: 'root'
})
export class UpcomingclassesService {
  public upcomingClases:string='../../assets/data/upcomingclasses/upcomingclasses.json'
  constructor(private httpRef:HttpClient) { }

  getUpcomingClasses():Observable<Upcomingclasses[]>{
    return this.httpRef.get<Upcomingclasses[]>(this.upcomingClases)
  }
  
}
