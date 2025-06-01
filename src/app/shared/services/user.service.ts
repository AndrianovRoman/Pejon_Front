import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserType} from "../../../types/user.type";
import {environment} from "../../../environments/environment";

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

}
