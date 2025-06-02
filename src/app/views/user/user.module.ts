import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UserComponent} from "./user.component";
import { UserDetailsComponent } from './user-details/user-details.component';
import {SharedModule} from "../../shared/shared.module";
import { CreateUpdateUserDialogComponent } from './create-update-user-dialog/create-update-user-dialog.component';


@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    UserDetailsComponent,
    CreateUpdateUserDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
