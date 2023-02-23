import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,FormBuilder } from '@angular/forms';

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
selectedValues: string[] = [];
  userProfileForm!: FormGroup;
  userImageForm!:FormGroup;

 constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.getLanguages();
    this.userProfile()
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
      firstname:(''),
      lastname:(''),
      headline:(''),
      biography:(''),
      languages:(''),
      website:(''),
      twitter:(''),
      linkedin:(''),
      facebook:(''),
      youtube:(''),
      selectedlanquages:[[]]
     })
  }


  //get Image 
  userImage():void{
    this.userImageForm=this.fb.group({
      imageControl:('https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg')
    })
  }
  //onUserProfileSubmition
 public  onUserProfileSubmit():void{
    console.log(this.userProfileForm.value)
  }
  //getProfileSettingValues
 public  getProfileSettingValues():void{
    window.alert("Values saved");
    console.log(this.selectedValues)
  }
}
