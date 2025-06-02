import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../shared/services/user.service";
import {AuthService} from "../../../core/auth/auth.service";
import {UserType} from "../../../../types/user.type";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userId: number | null;
  userInfo: UserType | undefined;

  profileForm = this.fb.group({
    name: ['', Validators.required],
    login: ['', [Validators.email, Validators.required]],
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
    this.userId = +this.authService.getUserInfo()!;
    console.log(this.userId)
  }

  ngOnInit(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(data => {
        this.userInfo = data;
        console.log(this.userInfo);
        const paramsToUpdate = {
          name: this.userInfo.name ? this.userInfo.name : null,
          login: this.userInfo.login ? this.userInfo.login : null,
        };
        this.profileForm.setValue(paramsToUpdate)
      })
    }
  }

  // update() {
  //   console.log('update')
  //   if (this.profileForm.valid) {
  //
  //   }
    // if (this.profileForm.valid && this.profileForm.value.name && this.profileForm.value.login && this.profileForm.value.role) {
    //   this.userService.login(this.profileForm.value.login, this.profileForm.value.password)
    //     .subscribe({
    //       next: (data: any) => {
    //
    //         const loginResponse = data as any;
    //         // console.log(loginResponse);
    //
    //         if (loginResponse.jwt && loginResponse.userId) {
    //           this.authService.setTokens(loginResponse.jwt, loginResponse.userId);
    //           this.router.navigate(['/']);
    //           this._snackBar.open('Вход выполнен успешно')
    //         }
    //       }
    //     })
    // }
  // }

}
