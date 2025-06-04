import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {AuthGuard} from "../../core/auth/auth.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'user/:userId', component: UserDetailsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
