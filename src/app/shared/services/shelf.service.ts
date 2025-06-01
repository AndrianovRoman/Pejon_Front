import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShelfCellsType} from "../../../types/shelf-cells.type";
import {environment} from "../../../environments/environment";
import {ShelfUpdateType} from "../../../types/shelf-update.type";

@Injectable({
  providedIn: 'root'
})
export class ShelfService {

  constructor(private http: HttpClient) { }

  getAllCellsByShelfId(shelfId: number): Observable<ShelfCellsType> {
    return this.http.get<ShelfCellsType>(environment.url + 'shelf/' + shelfId + '/cells');
  }

  addShelf(params: ShelfUpdateType): Observable<ShelfCellsType> {
    return this.http.post<ShelfCellsType>(environment.url + 'shelf', params);
  }

  updateShelfById(shelfId: number, params: ShelfUpdateType): Observable<ShelfCellsType> {
    return this.http.post<ShelfCellsType>(environment.url + 'shelf/' + shelfId, params);
  }

  deleteShelfById(shelfId: number): Observable<any> {
    return this.http.delete<any>(environment.url + 'shelf/' + shelfId);
  }

}
