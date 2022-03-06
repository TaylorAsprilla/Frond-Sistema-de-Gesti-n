import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { CargandoInformacionComponent } from './cargando-informacion/cargando-informacion.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { RouterModule } from '@angular/router';
import { CarnetVacunacionComponent } from './carnet-vacunacion/carnet-vacunacion.component';
import { SubirCarnetComponent } from './subir-carnet/subir-carnet.component';

@NgModule({
  declarations: [
    ModalImagenComponent,
    CargandoInformacionComponent,
    BuscadorComponent,
    DashboardComponent,
    CarnetVacunacionComponent,
    SubirCarnetComponent,
  ],
  exports: [
    ModalImagenComponent,
    CargandoInformacionComponent,
    BuscadorComponent,
    DashboardComponent,
    CarnetVacunacionComponent,
    SubirCarnetComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class ComponentsModule {}
