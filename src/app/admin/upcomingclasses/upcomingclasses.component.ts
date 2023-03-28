import { Component } from '@angular/core';
import { UpcomingclassesService } from 'src/app/services/upcomingclasses.service';
import {Upcomingclasses} from '../../models/upcoming-classes';

@Component({
  selector: 'app-upcomingclasses',
  templateUrl: './upcomingclasses.component.html',
  styleUrls: ['./upcomingclasses.component.scss']
})
export class UpcomingclassesComponent {
 public upcomingClassesData:Upcomingclasses[]=[];
 public selectedClasses:Upcomingclasses={}

  constructor(private upcomingclassesRef:UpcomingclassesService){
  }
  ngOnInit(){
    this.getUpcomingClassesData() 
  }

  public getUpcomingClassesData():void{
    try{
      this.upcomingclassesRef.getUpcomingClasses().subscribe((data)=>{      
        this.upcomingClassesData=data
        this.selectedClasses=data[0]
      })
    }catch(error){
      console.log('error',error)
    }
  }

  public onSelectClasses(data:Upcomingclasses):void{
   this.selectedClasses=data 
  }

 
}
