import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContainerComponent} from "./container.component";
import {CellsComponent} from "../../shared/cells/cells.component";

const routes: Routes = [
  {path: 'container', component: ContainerComponent},
  {path: 'container/:containerId/cells', component: CellsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
