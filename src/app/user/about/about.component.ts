import { Component, OnInit } from '@angular/core';
import { Content } from '../../user/about/interfaces/content';
import { AboutService } from './services/about.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  // for video and content of about page
  public aboutLmsContent: Content[] = [];
  public aboutLmsContentResult: Content[] = [];
  public count: number = 0;
  public display: boolean = false;
  constructor(private aboutServiceRef: AboutService) {}
  public ngOnInit(): void {
   try{
    this.aboutServiceRef.getAboutLmsData().subscribe((data) => {
      this.aboutLmsContent = data;
      this.aboutLmsContentResult.push(this.aboutLmsContent[this.count]);
    });
   } catch(error){
    console.log('error',error)
   }
  }
  //aboutlmscontent(increment)
  public forwardAboutLms(): void {
    if (this.count < this.aboutLmsContent.length - 1) {
      this.aboutLmsContentResult.splice(0, 1);
      this.count++;
      this.aboutLmsContentResult.push(this.aboutLmsContent[this.count]);
    }
  }
  //aboutlmscontent(decrement)
  public backwardAboutLms(): void {
    if (this.count > 0) {
      this.aboutLmsContentResult.splice(0, 1);
      this.count--;
      this.aboutLmsContentResult.push(this.aboutLmsContent[this.count]);
    }
  }
  //show dialog
  public showDialog(): void {
    this.display = true;
  }
}
