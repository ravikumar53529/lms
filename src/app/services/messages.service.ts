import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable}from 'rxjs';
import {Messages,msgCategories} from '../models/messages'
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  
  private userMessages="../../assets/data/message/messages.json"

  private messagesCategories="../../assets/data/message/messages-categories.json"
  constructor(private httpClientRef:HttpClient) { }

  //get Messages of users
  getUserMessages():Observable<Messages[]>{
    return this.httpClientRef.get<Messages[]>(this.userMessages)
  }

  //get Messages categories
   getMessagesCategories():Observable<msgCategories[]>{
    return this.httpClientRef.get<msgCategories[]>(this.messagesCategories)
   }

}
