import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth/auth.guard';
import { CamposComponent } from './administracion/campos/campos.component';
import { CongregacionesComponent } from './administracion/congregaciones/congregaciones.component';

import { MantenimientoCamposComponent } from './administracion/mantenimiento-campos/mantenimiento-campos.component';
import { MantenimientoCongregacionComponent } from './administracion/mantenimiento-congregacion/mantenimiento-congregacion.component';

import { MinisteriosComponent } from './administracion/ministerios/ministerios.component';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./child-routes/child-routes.module').then((m) => m.ChildRoutesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
