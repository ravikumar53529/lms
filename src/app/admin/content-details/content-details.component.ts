import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss'],
  
})
export class ContentDetailsComponent implements OnInit {
  value: number = 0;
  ngOnInit(): void {
   this.value = 56
  }
 
  
}
