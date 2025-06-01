import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UserComponent} from "./user.component";
import { UserDetailsComponent } from './user-details/user-details.component';


@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
