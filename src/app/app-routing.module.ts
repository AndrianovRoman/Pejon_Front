import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./shared/layout/layout.component";
import {MainComponent} from "./views/main/main.component";
import {AuthGuard} from "./core/auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: MainComponent},
      {path: '', loadChildren: () => import('./views/user/user.module').then(m => m.UserModule)},
      {path: '', loadChildren: () => import('./views/warehouse/warehouse.module').then(m => m.WarehouseModule), canActivate: [AuthGuard]},
      {path: '', loadChildren: () => import('./views/container/container.module').then(m => m.ContainerModule), canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
