import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LineType} from "../../../types/line.type";
import {environment} from "../../../environments/environment";
import {ShelfCellsType} from "../../../types/shelf-cells.type";
import {LineShelvesType} from "../../../types/line-shelves.type";

@Injectable({
  providedIn: 'root'
})
export class LineService {

  constructor(private http: HttpClient) {}

  getShelvesByLineId(lineId: string): Observable<ShelfCellsType[]> {
    return this.http.get<ShelfCellsType[]>(environment.url + 'shelf/line/' + lineId);
  }

  getLineById(lineId: string): Observable<LineShelvesType> {
    return this.http.get<LineShelvesType>(environment.url + 'line/' + lineId);
  }

  addLine(params: {name: string, warehouseId: string}): Observable<LineType> {
    return this.http.post<LineType>(environment.url + 'line', params);
  }

  updateLineById(lineId: number, params: {name: string, warehouseId: string}): Observable<LineType> {
    return this.http.post<LineType>(environment.url + 'line/' + lineId, params);
  }

  deleteLineById(lineId: number): Observable<any> {
    return this.http.delete<any>(environment.url + 'line/' + lineId);
  }

}
