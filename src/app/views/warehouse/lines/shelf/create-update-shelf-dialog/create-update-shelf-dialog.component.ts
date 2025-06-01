import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {ShelfService} from "../../../../../shared/services/shelf.service";

@Component({
  selector: 'app-create-update-shelf-dialog',
  templateUrl: './create-update-shelf-dialog.component.html',
  styleUrls: ['./create-update-shelf-dialog.component.css']
})
export class CreateUpdateShelfDialogComponent implements OnInit {

  lineId: number | null = null;
  title: string = 'Добавить стеллаж'

  constructor(public dialogShelfRef: MatDialogRef<CreateUpdateShelfDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {id: number, name: string, capacity: number, lineId: number},
              private shelfService: ShelfService,
              private activatedRoute: ActivatedRoute) {
    this.title = data.id ? 'Редактировать стеллаж' : 'Добавить стеллаж';
    this.lineId = data.lineId;
    console.log(this.lineId)
  }

  ngOnInit(): void {
  }

  save() {
    const params = {
      name: this.data.name,
      capacity: this.data.capacity,
      lineId: this.lineId!,
    }

    if (this.data.id) {
      this.shelfService.updateShelfById(this.data.id, params).subscribe(data => {
        this.dialogShelfRef.close('update')
      })
    } else {
      this.shelfService.addShelf(params).subscribe(data => {
        this.dialogShelfRef.close('add')
      })
    }
  }

}
