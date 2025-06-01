import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WarehouseLineType} from "../../../types/warehouse-line.type";
import {environment} from "../../../environments/environment";
import {ContainerType} from "../../../types/container.type";
import {LineType} from "../../../types/line.type";
import {ContainerCellsType} from "../../../types/container-cells.type";

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(private http: HttpClient) { }

  getAllContainers(): Observable<ContainerType[]> {
    return this.http.get<ContainerType[]>(environment.url + 'container/all');
  }

  getCellsByContainerId(containerId: string): Observable<ContainerCellsType> {
    return this.http.get<ContainerCellsType>(environment.url + 'container/' + containerId + '/cells');
  }

  addContainer(params: {name: string, capacity: number}): Observable<ContainerType> {
    return this.http.post<ContainerType>(environment.url + 'container', params);
  }

  updateContainerById(containerId: number, params: {name: string, capacity: number}): Observable<ContainerType> {
    return this.http.post<ContainerType>(environment.url + 'container/' + containerId, params);
  }

  deleteContainerById(containerId: number): Observable<any> {
    return this.http.delete<any>(environment.url + 'container/' + containerId);
  }

}
