import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {ZoneService} from "../../../../shared/services/zone.service";

@Component({
  selector: 'app-create-update-zone-dialog',
  templateUrl: './create-update-zone-dialog.component.html',
  styleUrls: ['./create-update-zone-dialog.component.css']
})
export class CreateUpdateZoneDialogComponent implements OnInit {

  warehouseId: string | null = null;
  title: string = 'Добавить зону'

  constructor(public dialogZoneRef: MatDialogRef<CreateUpdateZoneDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {id: number, name: string, capacity: number, warehouseId: string},
              private zoneService: ZoneService,
              private activatedRoute: ActivatedRoute) {
    this.title = data.id ? 'Редактировать зону' : 'Добавить зону';
    this.warehouseId = data.warehouseId;
    console.log(this.warehouseId)
  }

  ngOnInit(): void {
  }

  save() {

    const params = {
      name: this.data.name,
      capacity: this.data.capacity,
      warehouseId: this.warehouseId!,
    }

    if (this.data.id) {
      this.zoneService.updateZoneById(this.data.id, params).subscribe(data => {
        this.dialogZoneRef.close('update')
      })
    } else {
      this.zoneService.addZone(params).subscribe(data => {
        this.dialogZoneRef.close('add')
      })
    }

  }

}
