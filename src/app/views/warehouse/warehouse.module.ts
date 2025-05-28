import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import {WarehouseComponent} from "./warehouse.component";
import { LinesComponent } from './lines/lines.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WarehouseComponent,
    LinesComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    SharedModule
  ]
})
export class WarehouseModule { }
