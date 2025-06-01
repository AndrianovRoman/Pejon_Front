import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CellDtoType} from "../../../../types/cellDto.type";
import {WarehouseService} from "../../../shared/services/warehouse.service";

@Component({
  selector: 'app-create-update-dialog',
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.css']
})
export class CreateUpdateDialogComponent implements OnInit {

  title: string = 'Добавить склад'

  constructor(public dialogRef: MatDialogRef<CreateUpdateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {id: number, name: string},
              private warehouseService: WarehouseService) {
    this.title = data.id ? 'Редактировать склад' : 'Добавить склад'
  }

  ngOnInit(): void {
  }

  save() {
    if (this.data.id) {
      this.warehouseService.updateWarehouseById(this.data.id, this.data.name).subscribe(data => {
        this.dialogRef.close('update')
      })
    } else {
      this.warehouseService.addWarehouse(this.data.name).subscribe(data => {
        this.dialogRef.close('add')
      })
    }
  }

}
