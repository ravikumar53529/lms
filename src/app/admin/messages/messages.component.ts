import { Component,OnInit } from '@angular/core';
import {msgCategories,Messages} from '../../models/messages';
import {MessagesService} from '../../services/messages.service'
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public displayDialog:boolean=false;
  public textMessageFromInstructor:string='';
  public textMessageFromInstructorFinal:string='';
  public messageFromCompose:string=''
  public messageCategories:msgCategories[]=[];
  public allMessages:Messages[]=[];
  public tempMessageUsers:Messages[]=[]
  public instructorMessage:boolean=false;
  public unread:boolean=false;
  public importantValue:boolean=false;
  public userNotAnsweredValue:boolean=false
  public userAutomatedValue:boolean=false;
  public unreadMessages:Messages[]=[];
  public selectedMessage:Messages={
    name: '',
    message: '',
    date: '',
    image: '',
    category: ''
  }
  constructor(public msgService:MessagesService){}
   ngOnInit(): void {
     this.getAllMessages()
   }

   //getAllMessages
   public getAllMessages():void{
      try{
      this.msgService.getMessagesCategories().subscribe((data)=>{
        this.messageCategories=data;
        this.messageCategories.filter((data)=>{
          if(data.category==="All Messages"){
            this.allMessages=data.items;
            this.tempMessageUsers=this.allMessages;
            //default message view
            this.selectedMessage=data.items[0]
          }
        })
      })
      }catch(error){
        console.log('error',error)

      }
   }
  //showDialog
  public showDialog():void{
  this.displayDialog=true
  }
  //onUserMessageSelect
  public onUserMessageSelect(message:Messages):void{
    this.selectedMessage=message;
  }
  //messageFromInstructor
 public  messageFromInstructor():void{
  this.instructorMessage=true;
  this.textMessageFromInstructorFinal=this.textMessageFromInstructor;
  this.textMessageFromInstructor='';

 }
 //unreadMessages
 public userUnreadMessages(type:string):void{
 if(this.unread===false){
this.unread=true
this.messageCategories.filter((data)=>{
  if(data.category===type){
    this.tempMessageUsers=data.items
  }
})
 }else{
  this.unread=false
  this.tempMessageUsers=this.allMessages
 }
 }
  //Important
  public userImportantMessages(type:string):void{
    if(this.importantValue===false){
      this.importantValue=true
      this.messageCategories.filter((data)=>{
        if(data.category===type){
          this.tempMessageUsers=data.items
        }
      })
       }else{
        this.importantValue=false
        this.tempMessageUsers=this.allMessages
       }
 }

  //Not answered
  public userNotAnsweredMessages(type:string):void{
    
    if(this.userNotAnsweredValue===false){
      this.userNotAnsweredValue=true
      this.messageCategories.filter((data)=>{
        if(data.category===type){
          this.tempMessageUsers=data.items
        }
      })
       }else{
        this.userNotAnsweredValue=false
        this.tempMessageUsers=this.allMessages
       }
 }
  //automated
  public userAutomatedMessages(type:string):void{
    
    if(this.userAutomatedValue===false){
      this.userAutomatedValue=true
      this.messageCategories.filter((data)=>{
        if(data.category===type){
          this.tempMessageUsers=data.items
        }
      })
       }else{
        this.userAutomatedValue=false
        this.tempMessageUsers=this.allMessages
       }
 }

 //message from compose section
 public messageFromComposer():void{
      this.instructorMessage=true;
      this.displayDialog=false
      this.textMessageFromInstructorFinal=this.messageFromCompose
 }
}
