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
import { ContadorComponent } from './contador/contador/contador.component';
import { SeleccionarCongregacionIngresoComponent } from './seleccionar-congregacion-ingreso/seleccionar-congregacion-ingreso.component';

@NgModule({
  declarations: [
    ModalImagenComponent,
    CargandoInformacionComponent,
    BuscadorComponent,
    DashboardComponent,
    CarnetVacunacionComponent,
    SubirCarnetComponent,
    ContadorComponent,
    SeleccionarCongregacionIngresoComponent,
  ],
  exports: [
    ModalImagenComponent,
    CargandoInformacionComponent,
    BuscadorComponent,
    DashboardComponent,
    CarnetVacunacionComponent,
    SubirCarnetComponent,
    SeleccionarCongregacionIngresoComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class ComponentsModule {}
