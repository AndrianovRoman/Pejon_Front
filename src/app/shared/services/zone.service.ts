import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WarehouseLineType} from "../../../types/warehouse-line.type";
import {environment} from "../../../environments/environment";
import {ZoneCellsType} from "../../../types/zone-cells.type";
import {ZoneType} from "../../../types/zone.type";

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private http: HttpClient) { }

  getAllCellsByZoneId(zoneId: string): Observable<ZoneCellsType>  {
    return this.http.get<ZoneCellsType>(environment.url + 'zone/' + zoneId + '/cells');
  }

  addZone(params: {name: string, capacity: number, warehouseId: string}): Observable<ZoneType>  {
    return this.http.post<ZoneType>(environment.url + 'zone', params);
  }

  updateZoneById(zoneId: number, params: {name: string, capacity: number, warehouseId: string}): Observable<ZoneType>  {
    return this.http.post<ZoneType>(environment.url + 'zone/' + zoneId, params);
  }

  deleteZoneById(zoneId: number): Observable<any> {
    return this.http.delete<any>(environment.url + 'zone/' + zoneId);
  }
}
