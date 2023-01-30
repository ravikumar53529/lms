import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  contentData!: any;

  isLoading: boolean = false;
  public items: any

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
    ) {

  }

  ngOnInit(): void {
    this.iconMenu();
    this.getContent();
  }


  iconMenu(): void {
    this.items = [{
      label: 'Action',
      items: [{
        label: 'Logout',
        icon: 'pi pi-sign-out mt-0 text-danger',
        command: () => {
          this.onLogout();
        }
      },
      {
        label: 'Change Password',
        icon: 'pi pi-key ',
        command: () => {

        }
      }
      ]
    },

    ];
  }

  onLogout(): void {
    this.router.navigateByUrl('/login');
    localStorage.clear();
    location.reload();
  }

  getContent(): void {
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
