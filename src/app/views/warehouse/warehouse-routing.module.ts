import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WarehouseComponent} from "./warehouse.component";
import { LinesComponent } from './lines/lines.component';

const routes: Routes = [
  {path: 'warehouse', component: WarehouseComponent},
  {path: 'warehouse/:warehouseId/lines', component: LinesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
