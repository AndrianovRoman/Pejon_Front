import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CellUpdateType} from "../../../types/cell-update.type";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CommonType} from "../../../types/common.type";

@Injectable({
  providedIn: 'root'
})
export class TransportContainerService {

  constructor(private http: HttpClient) { }

  getAllTransportContainer(): Observable<CommonType[]> {
    return this.http.get<CommonType[]>(environment.url + 'transport-container/all');
  }

}
