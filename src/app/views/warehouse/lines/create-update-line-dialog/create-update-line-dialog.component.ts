import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LineService} from "../../../../shared/services/line.service";

@Component({
  selector: 'app-create-update-line-dialog',
  templateUrl: './create-update-line-dialog.component.html',
  styleUrls: ['./create-update-line-dialog.component.css']
})
export class CreateUpdateLineDialogComponent implements OnInit {

  warehouseId: string | null = null;
  title: string = 'Добавить линию'

  constructor(public dialogLineRef: MatDialogRef<CreateUpdateLineDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {id: number, name: string, warehouseId: string,},
              private lineService: LineService) {
    this.title = data.id ? 'Редактировать линию' : 'Добавить линию';
    this.warehouseId = data.warehouseId;
    console.log(this.warehouseId)
  }

  ngOnInit(): void {
  }

  save() {

    const params = {
      name: this.data.name,
      warehouseId: this.warehouseId!,
    }

    if (this.data.id) {
      this.lineService.updateLineById(this.data.id, params).subscribe(data => {
        this.dialogLineRef.close('update')
      })
    } else {
      this.lineService.addLine(params).subscribe(data => {
        this.dialogLineRef.close('add')
      })
    }
  }

}
