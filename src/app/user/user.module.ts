import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { RippleModule } from 'primeng/ripple';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { SheredModule } from '../component/shered.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { MyLibraryComponent } from './my-library/my-library.component';
import { AboutComponent } from './about/about.component';
import { CardModule } from 'primeng/card';
import { MessageComponent } from './message/message.component';
import { DropdownModule } from 'primeng/dropdown';
import {  AvatarModule } from 'primeng/avatar';
import { EditorModule } from 'primeng/editor';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [UserComponent, MyLibraryComponent, AboutComponent, MessageComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SheredModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RippleModule,
    ConfirmDialogModule,
    MessagesModule,
    ProgressSpinnerModule,
    InputTextModule,
    AdminRoutingModule,
    MatIconModule,
    MenuModule,
    DialogModule,
    TooltipModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    AvatarModule,
    EditorModule,
    HttpClientModule,
    TableModule
  ],
})
export class UserModule {}
