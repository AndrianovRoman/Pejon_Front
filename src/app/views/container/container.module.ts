import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container-routing.module';
import {ContainerComponent} from "./container.component";
import {SharedModule} from "../../shared/shared.module";
import { CreateUpdateDialogComponent } from './create-update-dialog/create-update-dialog.component';


@NgModule({
  declarations: [
    ContainerComponent,
    CreateUpdateDialogComponent,
  ],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    SharedModule
  ]
})
export class ContainerModule { }
