import { Component,OnInit ,AfterViewChecked} from '@angular/core';
import {msgCategories,Messages} from '../../models/messages';
import {MessagesService} from '../../services/messages.service'
interface multiSelectMsg{
  name:string
}
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit ,AfterViewChecked{
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
  public onSelectImportantMessageValue:boolean=false;
  public onSelectedImportantMessages:Messages[]=[]
  public unreadMessages:Messages[]=[];
  public importnatSelectedMessages:Messages[]=[];
  public multiSelectMessages:multiSelectMsg[]=[]
  public selectedMultiMsgs:multiSelectMsg[]=[];
  public searchUsers:string='';
  public selectedMessage:Messages={
    name: '',
    message: '',
    date: '',
    image: '',
    category: '',
    ID:0
  }
  constructor(private msgService:MessagesService){
    this.multiSelectUserMessages();
  }
   ngOnInit(): void {
     this.getAllMessages()
   }
  //on chnages
  public ngAfterViewChecked(): void {
   this.multiSelectAndCheckBoxes();

  }

  //get multiSelectFunctionality and main checkboxes
  public multiSelectAndCheckBoxes():void{
    if(this.selectedMultiMsgs.length>0){
      this.messageCategories.filter((data)=>{
        if(data.category===this.selectedMultiMsgs[0].name){
          this.tempMessageUsers=data.items;
        }else if(data.category==="oldest"){
          this.tempMessageUsers=data.items
        }
      })
     }else if( this.unread===false && this.userNotAnsweredValue===false && this.userAutomatedValue==false && this.importantValue===false){
      this.tempMessageUsers=this.allMessages
     }
    }
  

   //get multiSelectMessages
   public multiSelectUserMessages():void{
    this.multiSelectMessages=[
      {
        name:'Newest first'
      },
      {
         name:'Oldest first'
      }
    ]
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
  if(this.textMessageFromInstructor!=""){
    this.instructorMessage=true;
    this.textMessageFromInstructorFinal=this.textMessageFromInstructor;
    this.textMessageFromInstructor='';
  }else{
    alert("please enter message")
  }
 

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
  if(this.messageFromCompose!=""){
    this.instructorMessage=true;
    this.displayDialog=false
    this.textMessageFromInstructorFinal=this.messageFromCompose;
    this.messageFromCompose="";
  }else{
    alert("please add data")
  }
     
 }
 

 //importnat message
//  public importantMessage(message:Messages,id:number):void{
  
// if(this.onSelectImportantMessageValue===false){
// this.onSelectImportantMessageValue=true
// this.onSelectedImportantMessages.push(message)
//  console.log(this.onSelectImportantMessageValue)
//  console.log(this.onSelectedImportantMessages)
//  }
//  else{
//   this.onSelectImportantMessageValue=false
//   console.log(this.onSelectImportantMessageValue)
//    this.onSelectedImportantMessages.filter((data:Messages,index:number)=>{
//    if(data.ID===id){
//     this.onSelectedImportantMessages.splice(index,1)
//     console.log(this.onSelectedImportantMessages)
    
//    }
//   })
// }
//  }
}
