import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public tokenKey: string = 'jwt';
  public idKey: string = 'id';

  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean = false;

  constructor(private http: HttpClient,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.isLogged = !!localStorage.getItem(this.tokenKey);
  }

  login(login: string, password: string): Observable<any> {
    return this.http.post(environment.url + 'auth/login', {
      login, password
    })
  }

  signup(name: string, login: string, password: string, roleId: number): Observable<any> {
    return this.http.post<any>(environment.url + 'auth/register', {
      name, login, password, roleId
    })
  }

  public getIsLoggedIn() {
    // console.log(this.isLogged)
    return this.isLogged;
  }

  public getIsRole(): Observable<{nameRole: string}> {
    const id = localStorage.getItem(this.idKey);
    return this.http.get<{nameRole: string}>(environment.url + 'role/' + id);
  }

  public getUserInfo(): string | null {
    return localStorage.getItem(this.idKey)
  }

  public setTokens(token: string, id: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.idKey, id);
    this.isLogged = true;
    this.isLogged$.next(true);
  }

  public removeTokens(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.idKey);
    this.isLogged = false;
    this.isLogged$.next(false);
  }

  public getTokens(): {token: string | null} {
    // console.log(this.tokenKey)
    return {
      token: localStorage.getItem(this.tokenKey)
    }
  }

  logout(): void {
    this.removeTokens();
    // this.isRole = 'client';
    this.router.navigate(['/']);
    this._snackBar.open('Выход выполнен успешно')
  }

}
