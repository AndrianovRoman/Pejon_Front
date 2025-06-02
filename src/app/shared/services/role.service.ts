import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommonType} from "../../../types/common.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAllRole(): Observable<CommonType[]> {
    return this.http.get<CommonType[]>(environment.url + 'role/all');
  }
}
