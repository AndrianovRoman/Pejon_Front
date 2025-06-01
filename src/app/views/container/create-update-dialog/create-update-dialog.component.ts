import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContainerService} from "../../../shared/services/container.service";

@Component({
  selector: 'app-create-update-dialog',
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.css']
})
export class CreateUpdateDialogComponent implements OnInit {

  title: string = 'Добавить контейнер'

  constructor(public dialogRef: MatDialogRef<CreateUpdateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {id: number, name: string, capacity: number},
              private containerService: ContainerService) {
    this.title = data.id ? 'Редактировать контейнер' : 'Добавить контейнер'
  }

  ngOnInit(): void {
  }

  save() {

    const params = {
      name: this.data.name,
      capacity: this.data.capacity
    }

    if (this.data.id) {
      this.containerService.updateContainerById(this.data.id, params).subscribe(data => {
        this.dialogRef.close('update')
      })
    } else {
      this.containerService.addContainer(params).subscribe(data => {
        this.dialogRef.close('add')
      })
    }
  }

}
