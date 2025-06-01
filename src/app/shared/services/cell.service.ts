import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CellUpdateType} from "../../../types/cell-update.type";
import {Observable} from "rxjs";
import {ContainerType} from "../../../types/container.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CellService {

  constructor(private http: HttpClient) { }

  addCell(params: CellUpdateType): Observable<CellUpdateType> {
    return this.http.post<CellUpdateType>(environment.url + 'cell', params);
  }

  updateCellById(cellId: number, params: CellUpdateType): Observable<CellUpdateType> {
    return this.http.post<CellUpdateType>(environment.url + 'cell/' + cellId, params);
  }

}
