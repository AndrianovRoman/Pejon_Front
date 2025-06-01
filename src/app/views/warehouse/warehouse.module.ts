import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import {WarehouseComponent} from "./warehouse.component";
import { LinesComponent } from './lines/lines.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShelfComponent } from './lines/shelf/shelf.component';
import { CreateUpdateDialogComponent } from './create-update-dialog/create-update-dialog.component';
import { CreateUpdateZoneDialogComponent } from './lines/create-update-zone-dialog/create-update-zone-dialog.component';
import { CreateUpdateLineDialogComponent } from './lines/create-update-line-dialog/create-update-line-dialog.component';
import { CreateUpdateShelfDialogComponent } from './lines/shelf/create-update-shelf-dialog/create-update-shelf-dialog.component';


@NgModule({
  declarations: [
    WarehouseComponent,
    LinesComponent,
    ShelfComponent,
    CreateUpdateDialogComponent,
    CreateUpdateZoneDialogComponent,
    CreateUpdateLineDialogComponent,
    CreateUpdateShelfDialogComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    SharedModule,
  ]
})
export class WarehouseModule { }
