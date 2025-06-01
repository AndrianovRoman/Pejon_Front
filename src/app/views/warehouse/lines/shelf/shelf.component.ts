import { Component, OnInit } from '@angular/core';
import {LineService} from "../../../../shared/services/line.service";
import {ActivatedRoute} from "@angular/router";
import {ShelfCellsType} from "../../../../../types/shelf-cells.type";
import {MatDialog} from "@angular/material/dialog";
import {CellEditDialogComponent} from "../../../../shared/cell-edit-dialog/cell-edit-dialog.component";
import {CellDtoType} from "../../../../../types/cellDto.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ShelfService} from "../../../../shared/services/shelf.service";
import {CreateUpdateLineDialogComponent} from "../create-update-line-dialog/create-update-line-dialog.component";
import {CreateUpdateShelfDialogComponent} from "./create-update-shelf-dialog/create-update-shelf-dialog.component";
import {LineType} from "../../../../../types/line.type";

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  lineId: string | null = null;
  lineName: string | null = null;
  shelves: ShelfCellsType[] = [];

  role: string | undefined;

  constructor(private lineService: LineService,
              private shelfService: ShelfService,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
    this.role = 'Админ'
  }

  ngOnInit(): void {
    this.lineId = this.activatedRoute.snapshot.paramMap.get('lineId');

    this.loadShelves()
  }

  loadShelves() {
    this.lineService.getLineById(this.lineId!).subscribe(data => {
      this.lineName = data.name;
      this.shelves = data.shelfDtos;
      this.shelves.sort((a, b) => a.id - b.id);
    })
  }

  loadCellsByShelfId(shelfId: number) {
    this.shelfService.getAllCellsByShelfId(shelfId).subscribe(data => {
      this.shelves.forEach(item => {
        if (item.id === data.id) {
          item.cellDto = data.cellDto
        }
      })
    })
  }

  getSortedCells(cells: CellDtoType[]): CellDtoType[] {
    return cells.sort((a, b) => a.id - b.id);
  }

  openDialog(shelfId: number, data: CellDtoType | null) {
    console.log(shelfId);
    console.log(data);
    const dialogRef = this.dialog.open(CellEditDialogComponent, {
      data: {
        id: data ? data.id : null,
        name: data ? data.name : null,
        description: data ? data.description : null,
        transportContainer: data ? {
          id: data.transportContainer ? data.transportContainer.id : null,
          name: data.transportContainer ? data.transportContainer.name : null
        } : null,
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
          this.loadCellsByShelfId(shelfId)
        } else {
          this._snackBar.open('Ячейка успешно добавлена')
          this.loadShelves()
        }
      }
    })
  }

  openShelfDialog(shelf: ShelfCellsType | null) {
    console.log('create shelf');
    const dialogShelfRef = this.dialog.open(CreateUpdateShelfDialogComponent, {
      data: {
        id: shelf ? shelf.id : null,
        name: shelf ? shelf.name : null,
        capacity: shelf ? shelf.capacity : null,
        lineId: this.lineId,
      }
    });

    dialogShelfRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'update') {
          this._snackBar.open('Стеллаж успешно обновлена')
        } else {
          this._snackBar.open('Стеллаж успешно добавлена')
        }
        this.loadShelves();
      }
    });
  }

  deleteShelf(shelf: ShelfCellsType) {
    if (confirm('Вы уверены что хотите удалить линию: ' + shelf.name)) {
      console.log('Удаление')
      this._snackBar.open(shelf.name + ' успешно удалена')
      this.shelfService.deleteShelfById(shelf.id).subscribe(data => {
        this.loadShelves();
      });
    } else {
      this._snackBar.open('Удаление отменено')
    }
  }

  back() {
    window.history.back()
  }

}
