import { Component, OnInit } from '@angular/core';
import {WarehouseService} from "../../shared/services/warehouse.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateUpdateDialogComponent} from "./create-update-dialog/create-update-dialog.component";
import {WarehouseType} from "../../../types/warehouse.type";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  warehouses: WarehouseType[] = [];
  role: string | undefined;

  constructor(private warehouseService: WarehouseService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
    this.role = 'Админ'
  }

  ngOnInit(): void {
    this.loadItems()
  }

  loadItems() {
    this.warehouseService.getAllWarehouse().subscribe(data => {
      this.warehouses = data;
      this.warehouses.sort((a, b) => a.id - b.id)
    })
  }

  openDialog(warehouse: WarehouseType | null) {
    console.log('create warehouse');
    const dialogRef = this.dialog.open(CreateUpdateDialogComponent, {
      data: {
        id: warehouse ? warehouse.id : null,
        name: warehouse ? warehouse.name : null,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'update') {
          this._snackBar.open('Склад успешно обновлен')
        } else {
          this._snackBar.open('Склад успешно добавлен')
        }
        this.loadItems()
      }
    });
  }

  deleteItem(warehouse: WarehouseType) {
    if (confirm('Вы уверены что хотите удалить склад: ' + warehouse.name)) {
      console.log('Удаление')
      this._snackBar.open(warehouse.name + ' успешно удален')
      this.warehouseService.deleteWarehouseById(warehouse.id).subscribe(data => {
        this.loadItems()
      });
    } else {
      this._snackBar.open('Удаление отменено')
    }
  }


}
