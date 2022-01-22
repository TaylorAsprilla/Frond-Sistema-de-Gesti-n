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

    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'Progress' },
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { titulo: 'Gráfica # 1' },
      },

      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas' },
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: { titulo: 'RxJs' },
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { titulo: 'Perfil de usuario' },
      },
      {
        path: 'buscar/:termino',
        component: BusquedaComponent,
        data: { titulo: 'Busquedas' },
      },

      // Administración
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: { titulo: 'Usuarios Registrados' },
      },
      {
        path: 'ministerios',
        component: MinisteriosComponent,
        data: { titulo: 'Ministerios' },
      },
      {
        path: 'congregaciones',
        component: CongregacionesComponent,
        data: { titulo: 'Congregaciones' },
      },
      {
        path: 'congregacion/:id',
        component: MantenimientoCongregacionComponent,
        data: { titulo: 'Editar Congregacion' },
      },

      {
        path: 'campos',
        component: CamposComponent,
        data: { titulo: 'Campos' },
      },
      {
        path: 'campo/:id',
        component: MantenimientoCamposComponent,
        data: { titulo: 'Editar Campos' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
