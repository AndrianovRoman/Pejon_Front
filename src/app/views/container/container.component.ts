import { Component, OnInit } from '@angular/core';
import {ContainerType} from "../../../types/container.type";
import {ContainerService} from "../../shared/services/container.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateUpdateDialogComponent} from "./create-update-dialog/create-update-dialog.component";
import {AuthService} from "../../core/auth/auth.service";


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  containers: ContainerType[] = [];
  role: string | undefined;

  constructor(private containerService: ContainerService,
              public dialog: MatDialog,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
    this.authService.getIsRole().subscribe(data => {
      this.role = data.name;
    });
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.containerService.getAllContainers().subscribe(data => {
      this.containers = data;
      this.containers.sort((a, b) => a.id - b.id)
      console.log(data)
    })
  }

  openDialog(container: ContainerType | null) {
    console.log('create container');
    const dialogRef = this.dialog.open(CreateUpdateDialogComponent, {
      data: {
        id: container ? container.id : null,
        name: container ? container.name : null,
        capacity: container ? container.capacity : null,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'update') {
          this._snackBar.open('Контейнер успешно обновлен')
        } else {
          this._snackBar.open('Контейнер успешно добавлен')
        }
        this.loadItems()
      }
    });
  }

  deleteItem(container: ContainerType) {
    if (confirm('Вы уверены что хотите удалить контейнер: ' + container.name)) {
      console.log('Удаление')
      this._snackBar.open(container.name + ' успешно удален')
      this.containerService.deleteContainerById(container.id).subscribe(data => {
        this.loadItems()
      });
    } else {
      this._snackBar.open('Удаление отменено')
    }
  }

}
