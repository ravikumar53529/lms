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
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptor } from '../interceptor/token-interceptor.service';
import { ApiService } from '../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxUiLoaderRouterModule, NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule }
  from 'primeng/progressspinner';
import { HeaderComponent } from '../header/header.component';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "red",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "red",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "ball-spin-clockwise",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 170,
  "logoUrl": "https://raw.githubusercontent.com/t-ho/ngx-ui-loader/master/src/assets/angular.png",
  "masterLoaderId": "master",

  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}

@NgModule({
  declarations: [
    AdminComponent,
    
  ],
  imports: [
    CommonModule,
    SheredModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RippleModule,
    ConfirmDialogModule,
    MessagesModule,
    ProgressSpinnerModule,
    AdminRoutingModule,MatIconModule,MenuModule,DialogModule,TooltipModule,ButtonModule
  ],
  providers:[
    ApiService
  ]
})
export class AdminModule { }
