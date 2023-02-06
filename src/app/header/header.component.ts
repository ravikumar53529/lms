import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public items: any;
  isAdmin!: string | null;
  constructor(
    private router: Router
  ) { }
  ngOnInit(): void {
    this.iconMenu();
    if (this.isAdmin == '') {
      location.reload();
    }
    this.isAdmin = localStorage.getItem('role');

  }


  public iconMenu(): void {
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

 public onLogout(): void {
    this.router.navigateByUrl('/login');
    localStorage.clear();
    location.reload();
  }

}
