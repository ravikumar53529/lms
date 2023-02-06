import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public items: any;
  public mainItems: any;
  public contentItems: any;

  constructor(private router: Router) { }


  ngOnInit(): void {
    this.contentMenu();
    this.iconMenu();
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



  public contentMenu(): void {
    this.contentItems = [{
      // label: 'Action',

      label: 'Quiz',
      icon: 'pi pi-question-circle mt-0 text-primary',
      command: () => {
        this.quizNavigate();
      }
    },
    {
      label: 'Assessments',
      icon: 'pi pi-hourglass text-primary',
      command: () => {
        this.assessmentNavigate();
      }
    }
    ]
  }

  public quizNavigate(): void {
    this.router.navigateByUrl('/admin/quiz');
  }

  public assessmentNavigate(): void {
    this.router.navigateByUrl('/admin/assessment');
  }
}


