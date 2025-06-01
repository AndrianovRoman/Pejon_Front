import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WarehouseComponent} from "./warehouse.component";
import { LinesComponent } from './lines/lines.component';
import {ShelfComponent} from "./lines/shelf/shelf.component";
import {CellsComponent} from "../../shared/cells/cells.component";

const routes: Routes = [
  {path: 'warehouse', component: WarehouseComponent},
  {path: 'warehouse/:warehouseId', component: LinesComponent},
  {path: 'warehouse/:warehouseId/lines/:lineId', component: ShelfComponent},
  {path: 'warehouse/:warehouseId/zone/:zoneId', component: CellsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
