import { Component,OnInit } from '@angular/core';
import {MessagesService}from '../message/services/messages.service'
import{Messages} from '../message/interfaces/messages'
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit{
  public textMessage:string=''; 
  public userMessages:Messages[]=[];
  selectedUserMessage:Messages={
    name:'' ,
    message: '',
    date: '',
    image:''

  }
  constructor(private messageServiceRef:MessagesService){}
  ngOnInit(): void {
   this.getTextMessages();
  }
  //get messages
   public getTextMessages():void{
    try{
      this.messageServiceRef.getUserMessages().subscribe((data)=>{
        this.userMessages=data;
      })
    }catch(error){
     console.log('error',error)

    }
   }

   //get messages
  public getMessage(user: Messages):void{
    this.selectedUserMessage=user;
    console.log(this.selectedUserMessage.name)
  }
  //viewmessage
  public viewMessage(message:Messages):void{
    this.selectedUserMessage=message;
  }

   
}
