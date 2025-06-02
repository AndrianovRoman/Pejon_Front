import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WarehouseService} from "../../../shared/services/warehouse.service";
import {LineType} from "../../../../types/line.type";
import {ZoneType} from "../../../../types/zone.type";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LineService} from "../../../shared/services/line.service";
import {ZoneService} from "../../../shared/services/zone.service";
import {CreateUpdateLineDialogComponent} from "./create-update-line-dialog/create-update-line-dialog.component";
import {CreateUpdateZoneDialogComponent} from "./create-update-zone-dialog/create-update-zone-dialog.component";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css']
})
export class LinesComponent implements OnInit {

  warehouseId: string | null = null;

  lines: LineType[] = [];
  zones: ZoneType[] = [];
  warehouseName: string | null = null;

  role: string | undefined;

  constructor(private warehouseService: WarehouseService,
              private linaService: LineService,
              private zoneService: ZoneService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
    this.authService.getIsRole().subscribe(data => {
      this.role = data.name
    });
  }

  ngOnInit(): void {
    this.warehouseId = this.activatedRoute.snapshot.paramMap.get('warehouseId');

    this.warehouseService.getWarehouseById(this.warehouseId!).subscribe(data => {
      this.lines = data.line;
      this.zones = data.zone;

      this.lines.sort((a, b) => a.id - b.id)
      this.zones.sort((a, b) => a.id - b.id)
      this.warehouseName = data.name;
    });
  }

  loadLines() {
    this.warehouseService.getLinesByWarehouseId(this.warehouseId!).subscribe(data => {
      this.lines = data;
      this.lines.sort((a, b) => a.id - b.id)
    })
  }

  loadZones() {
    this.warehouseService.getZonesByWarehouseId(this.warehouseId!).subscribe(data => {
      this.zones = data;
      this.zones.sort((a, b) => a.id - b.id)
    })
  }


  back() {
    window.history.back()
  }

  openLineDialog(line: LineType | null) {
    console.log('create line');
    const dialogLineRef = this.dialog.open(CreateUpdateLineDialogComponent, {
      data: {
        id: line ? line.id : null,
        name: line ? line.name : null,
        warehouseId: this.warehouseId,
      }
    });

    dialogLineRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'update') {
          this._snackBar.open('Линия успешно обновлена')
        } else {
          this._snackBar.open('Линия успешно добавлена')
        }
        this.loadLines();
      }
    });
  }

  deleteLine(line: LineType) {
    if (confirm('Вы уверены что хотите удалить линию: ' + line.name)) {
      console.log('Удаление')
      this._snackBar.open(line.name + ' успешно удалена')
      this.linaService.deleteLineById(line.id).subscribe(data => {
        this.loadLines();
      });
    } else {
      this._snackBar.open('Удаление отменено')
    }
  }

  openZoneDialog(zone: ZoneType | null) {
    console.log('create zone');
    const dialogZoneRef = this.dialog.open(CreateUpdateZoneDialogComponent, {
      data: {
        id: zone ? zone.id : null,
        name: zone ? zone.name : null,
        capacity: zone ? zone.capacity : null,
        warehouseId: this.warehouseId,
      }
    });

    dialogZoneRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'update') {
          this._snackBar.open('Зона успешно обновлена')
        } else {
          this._snackBar.open('Зона успешно добавлена')
        }
        this.loadZones();
      }
    });
  }

  deleteZone(zone: ZoneType) {
    if (confirm('Вы уверены что хотите удалить зону: ' + zone.name)) {
      console.log('Удаление')
      this._snackBar.open(zone.name + ' успешно удалена')
      this.zoneService.deleteZoneById(zone.id).subscribe(data => {
        this.loadZones();
      });
    } else {
      this._snackBar.open('Удаление отменено')
    }
  }

}
