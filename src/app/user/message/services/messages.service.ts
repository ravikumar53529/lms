import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable}from 'rxjs';
import {Messages} from '../interfaces/messages'
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  
  private userMessages="../../assets/data/message/messages.json"
  constructor(private httpClientRef:HttpClient) { }

  //get Messages of users
  getUserMessages():Observable<Messages[]>{
    return this.httpClientRef.get<Messages[]>(this.userMessages)
  }

}
