import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { BusquedaComponent } from '../busqueda/busqueda.component';
import { UsuariosComponent } from '../administracion/usuarios/usuarios.component';
import { MinisteriosComponent } from '../administracion/ministerios/ministerios.component';
import { CongregacionesComponent } from '../administracion/congregaciones/congregaciones.component';
import { MantenimientoCongregacionComponent } from '../administracion/mantenimiento-congregacion/mantenimiento-congregacion.component';
import { CamposComponent } from '../administracion/campos/campos.component';
import { MantenimientoCamposComponent } from '../administracion/mantenimiento-campos/mantenimiento-campos.component';
import { MantenimientoUsuariosComponent } from '../administracion/mantenimiento-usuarios/mantenimiento-usuarios.component';
import { MantenimientoUsuariosAdminComponent } from '../administracion/mantenimiento-usuarios-admin/mantenimiento-usuarios-admin.component';
import { PermisoEnum } from 'src/app/services/sidebar/sidebar.service';
import { InformePowerBiComponent } from '../informes/informe-power-bi/informe-power-bi.component';

const childRoutes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
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
    data: { permisos: PermisoEnum.ADMINISTRADOR },
  },
  {
    path: 'usuario/:id',
    component: MantenimientoUsuariosComponent,
  },
  {
    path: 'ministerios',
    component: MinisteriosComponent,
    data: { titulo: 'Ministerios' },
  },
  {
    path: 'congregaciones',
    component: CongregacionesComponent,
    data: { titulo: 'Congregaciones', permisos: PermisoEnum.ADMINISTRADOR },
  },
  {
    path: 'congregacion/:id',
    component: MantenimientoCongregacionComponent,
    data: { titulo: 'Editar Congregación' },
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
  {
    path: 'usuarioadmin/:id',
    component: MantenimientoUsuariosAdminComponent,
    data: { titulo: 'Editar Usuarios - Administrador' },
  },
  {
    path: 'informe',
    component: InformePowerBiComponent,
    data: { titulo: 'Tablero de informes' },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
