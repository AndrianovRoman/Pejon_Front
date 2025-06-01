import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CellDtoType} from "../../../types/cellDto.type";
import {ContainerService} from "../services/container.service";
import {CellEditDialogComponent} from "../cell-edit-dialog/cell-edit-dialog.component";
import {WarehouseService} from "../services/warehouse.service";
import {ZoneService} from "../services/zone.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.css']
})
export class CellsComponent implements OnInit {

  containerId: string | null = null;
  warehouseId: string | null = null;
  zoneId: string | null = null;

  role: string | undefined;

  containerName: string | null = null;
  cells: CellDtoType[] = []

  constructor(private containerService: ContainerService,
              private zoneService: ZoneService,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
    this.role = 'Админ'
  }

  ngOnInit(): void {
    this.containerId = this.activatedRoute.snapshot.paramMap.get('containerId');
    this.warehouseId = this.activatedRoute.snapshot.paramMap.get('warehouseId');
    this.zoneId = this.activatedRoute.snapshot.paramMap.get('zoneId');

    this.loadCells()
  }

  loadCells() {
    if (this.containerId) {
      this.containerService.getCellsByContainerId(this.containerId!).subscribe(data => {
        console.log(data);
        this.containerName = data.name;
        this.cells = data.cellDto;
        this.cells.sort((a, b) => a.id - b.id)
      })
    } else if (this.warehouseId) {
      this.zoneService.getAllCellsByZoneId(this.zoneId!).subscribe(data => {
        console.log(data);
        this.containerName = data.name;
        this.cells = data.cellDto;
        this.cells.sort((a, b) => a.id - b.id)
      })
    }
  }

  openDialog(data: CellDtoType | null) {
    console.log(data)
    const dialogRef = this.dialog.open(CellEditDialogComponent, {
      data: {
        id: data ? data.id : null,
        name: data ? data.name : null,
        description: data ? data.description : null,
        transportContainer: {
          id: data ? data.transportContainer.id : null,
          name: data ? data.transportContainer.name : null
        },
        storage: {
          id: data ? data.storage.id : null,
          name: data ? data.storage.name : null,
          capacity: data ? data.storage.capacity : null
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'send') {
          this._snackBar.open('Запрос отправлен на редактирование')
        } else if (result === 'update') {
          this._snackBar.open('Ячейка успешно обновлена')
          this.loadCells()
        } else {
          this._snackBar.open('Ячейка успешно добавлена')
          this.loadCells()
        }
      }
    })
  }

  back() {
    window.history.back()
  }

}
