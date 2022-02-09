import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { CargandoInformacionComponent } from './cargando-informacion/cargando-informacion.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { RouterModule } from '@angular/router';
import { CarnetVacunacionComponent } from './carnet-vacunacion/carnet-vacunacion.component';

@NgModule({
  declarations: [
    ModalImagenComponent,
    CargandoInformacionComponent,
    BuscadorComponent,
    DashboardComponent,
    CarnetVacunacionComponent,
  ],
  exports: [
    ModalImagenComponent,
    CargandoInformacionComponent,
    BuscadorComponent,
    DashboardComponent,
    CarnetVacunacionComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ComponentsModule {}
