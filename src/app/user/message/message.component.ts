import { Component,OnInit } from '@angular/core';
import {MessagesService}from '../../services/messages.service'
import{Messages} from '../../models/messages'
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit{
  public textMessage:string=''; 
  public userMessages:Messages[]=[];
  selectedCategory:string='';
  composeStatus:boolean=false;
  viewMessageStatus:boolean=false;
  selectedUserMessage:Messages={
    name:'' ,
    message: '',
    date: '',
    image:'',
    category:''

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
    this.viewMessageStatus=true;
    this.composeStatus=false;
  }
  //showCategory
  showCategory(category:string){
    console.log(category)
  }
  //importantMessages
  importantMessages(){
    console.log("importnat message")

  }
  //compose
  composeSection(){
    this.composeStatus=true;
    this.viewMessageStatus=false
  }

  //sendMessage
  public sendMessage():void{
    console.log(this.textMessage)
  }

   
}
