import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators } from '@angular/forms';
import {userProfile}from '../../models/profile';
import { Message } from 'primeng/api';
import { ImageCroppedEvent } from 'ngx-image-cropper';
interface Lanquages{
  name:string
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
public mainLanquages:Lanquages[]=[]
public selectedLangauges:Lanquages[]=[]
public selectedValues: string[] = [];
public userProfileForm!: FormGroup;
public userImageForm!:FormGroup;
public imageData:string='https://static.vecteezy.com/system/resources/previews/000/376/355/original/user-management-vector-icon.jpg'
public reader!: FileReader;
public userProfileSettings:string[]=[];
public userProfileDataFromLocalStorage:userProfile={
  biography: '',
  facebook: '',
  firstname: '',
  headline: '',
  lastname: '',
  linkedin: '',
  selectedlanquages: [],
  twitter: '',
  website: '',
  youtube: ''
}
public messageInfo:boolean=false;
public savedProfileInfo:boolean=false;
public savedProfileMessages:Message[]=[];
public msgs:Message[]=[];

//image crop 
imgChangeEvt: any = '';
cropImgPreview: any = 'https://static.vecteezy.com/system/resources/previews/000/376/355/original/user-management-vector-icon.jpg';
visiblePopup:boolean=false;
 constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    this.getLanguages();
    this.userProfile();
    this.userImage();
  }
  //get Langquages in multiselect items
  public getLanguages(): void {
    this.mainLanquages = [
      {  
        name: 'English',
      },
      {
        name: 'Telugu',
      },
      {
        name: 'Hindhi',
      },
    ];
  }
  //userProfileForm
  public userProfile():void{
     this.userProfileForm=this.fb.group({
      firstname: new FormControl('',[ Validators.required, Validators.minLength(8)]),
      lastname:new FormControl('',[Validators.required,Validators.minLength(8)]),
      headline:new FormControl('',[Validators.required,Validators.minLength(10)]),
      biography:new FormControl('',[Validators.required,Validators.minLength(10)]),
      website:new FormControl('',[Validators.required,Validators.pattern('^(http(s)?:\\/\\/)?(www\.)([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+(\\/\\S*)?$')
    ]),
      twitter:new FormControl('',[Validators.required,Validators.minLength(5)]),
      linkedin:new FormControl('',[Validators.required,Validators.minLength(5)]),
      facebook:new FormControl('',[Validators.required,Validators.minLength(5)]),
      youtube:new FormControl('',[Validators.required,Validators.minLength(5)]),
      selectedlanquages:new FormControl('',[Validators.required,Validators.minLength(2)])
     })
  }
  //ImageForm 
  public userImage():void{
    this.userImageForm=this.fb.group({
         imageControl:['',Validators.required]
    })
  }
  //onUserProfileSubmition
 public  onUserProfileSubmit():void{
    localStorage.setItem("userProfileForm",JSON.stringify(this.userProfileForm.value));
    this.userProfileDataFromLocalStorage=JSON.parse(localStorage.getItem("userProfileForm") as string)
    this.userProfileForm.reset();
    this.savedProfile();
  }
  //onImageFilesubmition
  public onImageUpload(event:Event):void{
    this.imgChangeEvt=event;
    this.visiblePopup=true
  // const target=event.target as HTMLInputElement;
  // const file:File=(target.files as FileList)[0];
  // const reader=new FileReader();
  // if(target.files && target.files.length){
  // reader.readAsDataURL(file);
  //  reader.onload=()=>{
  //       this.userImageForm.patchValue({
  //         imageControl:reader.result
  //       })
  //       this.imageData=this.userImageForm.value.imageControl;
  //       this.messageInfo=false;
  //     }   
  // }
  }

//show messages
 public showMessages():void{
  this.messageInfo=true;
  this.msgs.push({severity:'success',summary:'Image saved',detail:'Image saved successfully',life:3000})
 }
 //show message for saved profile data
public savedProfile():void{
 this.savedProfileInfo=true;
 this.savedProfileMessages.push({severity:'success',summary:'Instructor profile details saved successfully',life:3000})
}


    //save image
 public  saveImage():void{
    localStorage.setItem("userImageform",JSON.stringify(this.cropImgPreview))
    this.imageData=''
    this.imageData=JSON.parse(localStorage.getItem("userImageform") as string)
    this.showMessages();
  }
  //saveProfileSettingValues
    public  savingProfileSettingValues():void{
    localStorage.setItem("profileSettingValues",JSON.stringify(this.selectedValues));
    this.userProfileSettings=JSON.parse(localStorage.getItem("profileSettingValues") as string)
    alert("Setting values saved")
  }

  //for vaidations profile form

  public get firstname(){
    return this.userProfileForm.get('firstname')
  }
  public get lastname(){
    return this.userProfileForm.get('lastname')
  }
  public get headline(){
    return this.userProfileForm.get('headline')
  }
  public get biography(){
    return this.userProfileForm.get('biography')
  }
  public get website(){
    return this.userProfileForm.get('website')
  }
  public get twitter(){
    return this.userProfileForm.get('twitter')
  }
  public get linkedin(){
    return this.userProfileForm.get('linkedin')
  }
  public get facebook(){
    return this.userProfileForm.get('facebook')
  }
  public get youtube(){
    return this.userProfileForm.get('youtube')
  }
  public get selectedlanquages(){
    return this.userProfileForm.get('selectedlanquages')
  }

//image validations
public get imageControl(){
  return this.userProfileForm.get('imageControl')
}



//image crop
onFileChange(event: any): void {
  this.imgChangeEvt = event;
}
cropImg(e: ImageCroppedEvent) {
  this.cropImgPreview = e.base64;
}
imgLoad() {
  // display cropper tool
}
initCropper() {
  // init cropper
}

imgFailed() {
  // error msg
}
//onPopupClose
public onPopupClose(){
  this.visiblePopup=false
}
  
}