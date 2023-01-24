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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptor/token-interceptor.service';
import { ApiService } from '../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    SheredModule,
    ReactiveFormsModule,
    AdminRoutingModule,MatIconModule,SheredModule,MenuModule,DialogModule,TooltipModule,ButtonModule
  ],
  providers:[
    ApiService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ]
})
export class AdminModule { }
