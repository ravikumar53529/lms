import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators } from '@angular/forms';
import {userProfile}from '../../models/profile'
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
public imageData:string=''
public imageFileSelected=false
public reader!: FileReader;
public userProfileSettings:string[]=[];
userProfileDataFromLocalStorage:userProfile={
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
 constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    this.getLanguages();
    this.userProfile();
    this.userImage();
  }
  //get tabmenu items
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
      website:new FormControl('',[Validators.required,Validators.minLength(5)]),
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
    console.log(this.userProfileForm.value)
    localStorage.setItem("userProfileForm",JSON.stringify(this.userProfileForm.value));
    this.userProfileDataFromLocalStorage=JSON.parse(localStorage.getItem("userProfileForm") as string)
    this.userProfileForm.reset();
  }
  //onImageFilesubmition
  public onImageUpload(event:any):void{
    this.reader=new FileReader();
    if(event.target.files && event.target.files.length){
      const [file]=event.target.files;
      this.reader.readAsDataURL(file);    
      this.reader.onload=()=>{
        this.userImageForm.patchValue({
          imageControl:this.reader.result
        })
        this.imageFileSelected=true
        this.imageData=this.userImageForm.value.imageControl;
      }
      alert("Image for preview")
    }
  }
    //save image
 public  saveImage():void{
    localStorage.setItem("userImageform",JSON.stringify(this.userImageForm.value.imageControl))
    this.imageData=''
    this.imageData=JSON.parse(localStorage.getItem("userImageform") as string)
    window.alert("image saved")
  }
  //saveProfileSettingValues
    public  savingProfileSettingValues():void{
    console.log(this.selectedValues)
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

  
}
