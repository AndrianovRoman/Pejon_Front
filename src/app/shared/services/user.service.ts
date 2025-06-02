import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserType} from "../../../types/user.type";
import {environment} from "../../../environments/environment";
import {UserCreateType} from "../../../types/user-create.type";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserType[]> {
    return this.http.get<UserType[]>(environment.url + 'user/all');
  }

  getUserById(userId: number): Observable<UserType> {
    return this.http.get<UserType>(environment.url + 'user/' + userId);
  }

  updateUserById(userId: number, params: UserCreateType): Observable<UserCreateType> {
    return this.http.post<UserCreateType>(environment.url + 'user/' + userId, params);
  }

}
