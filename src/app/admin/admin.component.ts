import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit  {
  display: boolean = false;

  showDialog() {
      this.display = true;
  }
  public items:any
  ngOnInit() {
    this.items = [{
        label: 'Action',
        items: [{
            label: 'Logout',
            icon: 'pi pi-sign-out mt-0 text-danger',
            command: () => {
                
            }
        },
        {
            label: 'Change Password',
            icon: 'pi pi-key ',
            command: () => {
                 
            }
        }
        ]},
     
    ];
}
}
