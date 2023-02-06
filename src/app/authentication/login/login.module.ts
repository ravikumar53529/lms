import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderConfig } from 'ngx-ui-loader';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
    LoginComponent,
    // SpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    // NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    LoginRoutingModule
  ]
})
export class LoginModule { }
