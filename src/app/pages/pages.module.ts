import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos propios
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { InicioComponent } from './inicio/inicio.component';
import { PagesComponent } from './pages.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { MinisteriosComponent } from './administracion/ministerios/ministerios.component';
import { PipesModule } from '../pipes/pipes.module';
import { CongregacionesComponent } from './administracion/congregaciones/congregaciones.component';
import { MantenimientoCongregacionComponent } from './administracion/mantenimiento-congregacion/mantenimiento-congregacion.component';
import { CamposComponent } from './administracion/campos/campos.component';
import { MantenimientoCamposComponent } from './administracion/mantenimiento-campos/mantenimiento-campos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MantenimientoUsuariosComponent } from './administracion/mantenimiento-usuarios/mantenimiento-usuarios.component';

@NgModule({
  declarations: [
    InicioComponent,
    PagesComponent,
    NopagefoundComponent,
    PerfilComponent,
    UsuariosComponent,
    MinisteriosComponent,
    CongregacionesComponent,
    MantenimientoCongregacionComponent,
    CamposComponent,
    MantenimientoCamposComponent,
    BusquedaComponent,
    MantenimientoUsuariosComponent,
  ],
  exports: [InicioComponent, PagesComponent, NopagefoundComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule, ComponentsModule, PipesModule],
})
export class PagesModule {}
