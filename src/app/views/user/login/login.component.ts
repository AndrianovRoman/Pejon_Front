import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$')]],
  })

  constructor(private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    console.log('login')
    // if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
    //   this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    //     .subscribe({
    //       next: (data: any) => {
    //
    //         const loginResponse = data as any;
    //         console.log(loginResponse);
    //
    //         if (loginResponse.token && loginResponse.id) {
    //           this.authService.setTokens(loginResponse.token, loginResponse.id);
    //           this.router.navigate(['/']);
    //         }
    //       }
    //     })
    // }
  }

}
