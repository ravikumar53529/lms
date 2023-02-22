import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  items: MenuItem[] = [];
 activeItem:MenuItem={}
  ngOnInit(): void {
    this.getTabMenuItems();
  }
  //get tabmenu items
  public getTabMenuItems(): void {
    this.items = [
      {
        label: 'Lms profile',
        icon: 'pi pi-user',
      },
      {
        label: 'Profile picture',
        icon: 'pi pi-camera',
      },
      {
        label: 'Profile settings',
        icon:'pi pi-cog'
      },
    ];
    this.activeItem=this.items[0]
  }
}
