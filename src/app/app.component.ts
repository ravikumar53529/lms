import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isAuthenticated!: string | null;

  constructor(){

  }
  ngOnInit(): void {
   this.isAuthenticated =  localStorage.getItem('isAuthenticate');
  }
}
