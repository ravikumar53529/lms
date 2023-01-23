import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { SheredModule } from '../component/shered.module';
import {MenuModule} from 'primeng/menu';
import {DialogModule} from 'primeng/dialog';
import {TooltipModule} from 'primeng/tooltip';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    SheredModule,
    AdminRoutingModule,MatIconModule,SheredModule,MenuModule,DialogModule,TooltipModule,ButtonModule
  ]
})
export class AdminModule { }
