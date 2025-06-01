import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {WarehouseLineType} from "../../../types/warehouse-line.type";
import {LineType} from "../../../types/line.type";
import {ZoneType} from "../../../types/zone.type";
import {WarehouseType} from "../../../types/warehouse.type";

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) { }

  getAllWarehouse(): Observable<WarehouseType[]> {
    return this.http.get<WarehouseType[]>(environment.url + 'warehouse/all');
  }

  getWarehouseById(warehouseId: string): Observable<WarehouseLineType> {
    return this.http.get<WarehouseLineType>(environment.url + 'warehouse/' + warehouseId);
  }

  getLinesByWarehouseId(warehouseId: string): Observable<LineType[]> {
    return this.http.get<LineType[]>(environment.url + 'warehouse/' + warehouseId + '/lines');
  }

  getZonesByWarehouseId(warehouseId: string): Observable<ZoneType[]> {
    return this.http.get<ZoneType[]>(environment.url + 'warehouse/' + warehouseId + '/zones');
  }

  addWarehouse(name: string): Observable<any> {
    return this.http.post<string>(environment.url + 'warehouse', {name: name});
  }

  updateWarehouseById(warehouseId: number, name: string): Observable<any> {
    return this.http.post<string>(environment.url + 'warehouse/' + warehouseId, {name: name});
  }

  deleteWarehouseById(warehouseId: number): Observable<any> {
    return this.http.delete<string>(environment.url + 'warehouse/' + warehouseId);
  }

}
