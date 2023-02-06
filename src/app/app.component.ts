import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isAuthenticated!: string | null;
  isLoading: boolean = true;

  constructor(){

  }
  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(()=> {
      this.isLoading = false;
    },3000)
   this.isAuthenticated =  localStorage.getItem('isAuthenticate');
  }
}
