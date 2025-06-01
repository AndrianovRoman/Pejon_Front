import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { CellEditDialogComponent } from './cell-edit-dialog/cell-edit-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {CellsComponent} from "./cells/cells.component";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    LayoutComponent,
    BreadcrumbComponent,
    CellEditDialogComponent,
    CellsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    LayoutComponent,
    BreadcrumbComponent,
    CellEditDialogComponent,
    CellsComponent,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
