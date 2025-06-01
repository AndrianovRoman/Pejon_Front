import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    login: ['', [Validators.email, Validators.required]],
    // password: ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$')]],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login(): void {
    // console.log('login')
    if (this.loginForm.valid && this.loginForm.value.login && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.login, this.loginForm.value.password)
        .subscribe({
          next: (data: any) => {

            const loginResponse = data as any;
            // console.log(loginResponse);

            if (loginResponse.jwt && loginResponse.userId) {
              this.authService.setTokens(loginResponse.jwt, loginResponse.userId);
              this.router.navigate(['/']);
              this._snackBar.open('Вход выполнен успешно')
            }
          }
        })
    }
  }



}
