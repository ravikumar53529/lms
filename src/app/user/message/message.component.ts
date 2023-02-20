import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { Messages, msgCategories } from '../../models/messages';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
 
  public textMessage: string = '';
  public userMessage: string = '';
  public userMessages: Messages[] = [];
  public messagesCategories: msgCategories[] = [];
  public UnreadMessageslength:number=0;
  public unreadMessages:{id:string,category:string,items:Messages[]}={
    id: '',
    category: '',
    items:[]
  }
  public selectedCategory:{id:string,category:string,items:Messages[]}={
    id: '',
    category: '',
    items:[]
  }
  public composeStatus: boolean = false;
  public viewMessageStatus: boolean = false;
  public selectedUserMessage: Messages = {
    name: '',
    message: '',
    date: '',
    image: '',
    category: '',
  };
  constructor(private messageServiceRef: MessagesService) {}
  ngOnInit(): void {
    this.getTextMessages();
    this.userMessagesCategory();
  }
  //get messages
  public getTextMessages(): void {
    try {
      this.messageServiceRef.getUserMessages().subscribe((data) => {
        this.userMessages = data;
      });
    } catch (error) {
      console.log('error', error);
    }
  }
  //get messages categories
  public userMessagesCategory(): void {
    try {
      this.messageServiceRef.getMessagesCategories().subscribe((data) => {
        this.messagesCategories = data;
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  //get messages
  public getMessage(user: Messages): void {
    this.selectedUserMessage = user;
  }
  //viewmessage
  public viewMessage(message: Messages): void {
    this.selectedUserMessage = message;
    this.viewMessageStatus = true;
    this.composeStatus = false;
  }
  //showCategory
 public showCategory():void{
    this.userMessage=""
    this.userMessages=this.selectedCategory.items;
  }
  //importantMessages
  importantMessages() {
    
  }
  //compose
  public composeSection():void {
    this.composeStatus = true;
    this.viewMessageStatus = false;
  }

  //sendMessage
  public sendMessage(): void {
    if(this.textMessage!=""){
    this.userMessage = this.textMessage;
      this.textMessage=""
    }else{
      console.log("error")
    }
   
  }
}
