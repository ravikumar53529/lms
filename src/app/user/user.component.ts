import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  contentData!: any;

  isLoading: boolean = false;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.getContent();
  }

  getContent() : void {
    this.isLoading = true;
    this.apiService.getContent().subscribe(res => {
      if (!res) {
        this.snackBar.open('Something went to wrong !!', 'Ok', {
          duration: 3000
        });
       
      }
      this.contentData = res.data;
      console.log(this.contentData);
      this.isLoading = false;
    })
  }

}
