import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CellDtoType} from "../../../types/cellDto.type";
import {CellService} from "../services/cell.service";
import {TransportContainerService} from "../services/transport-container.service";
import {CommonType} from "../../../types/common.type";
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-cell-edit-dialog',
  templateUrl: './cell-edit-dialog.component.html',
  styleUrls: ['./cell-edit-dialog.component.css']
})
export class CellEditDialogComponent implements OnInit {

  cellName: string | null = null;
  transportContainers: CommonType[] = [];
  role: string | undefined;
  transportContainerControl: number = 0;

  constructor(public dialogRef: MatDialogRef<CellEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CellDtoType,
              private cellService: CellService,
              private authService: AuthService,
              private transportContainerService: TransportContainerService) {
    this.cellName = data.transportContainer.name;
    this.transportContainerService.getAllTransportContainer().subscribe(data => {
      this.transportContainers = data;
      console.log(this.transportContainers)
    })
    this.authService.getIsRole().subscribe(data => {
      this.role = data.name
    });
    this.transportContainerControl = data.transportContainer.id ? data.transportContainer.id : 0
  }

  ngOnInit(): void {
  }

  sendApplication() {
    const params = {
      name: this.data.name,
      description: this.data.description,
      transportContainerId: this.transportContainerControl,
      storageId: this.data.storage.id
    }

    // if (this.role === 'Админ') {
      if (this.data.id) {
        this.cellService.updateCellById(this.data.id, params).subscribe(data => {
          this.dialogRef.close('update')
        })
      } else {
        this.cellService.addCell(params).subscribe(data => {
          this.dialogRef.close('add')
        })
      }
    // } else {
    //   this.dialogRef.close('send')
    // }
  }

}
