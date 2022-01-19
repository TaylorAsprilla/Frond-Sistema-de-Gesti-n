import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';

import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { CargandoInformacionComponent } from './cargando-informacion/cargando-informacion.component';
import { BuscardorComponent } from './buscardor/buscardor.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
    CargandoInformacionComponent,
    BuscardorComponent,
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
    CargandoInformacionComponent,
    BuscardorComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class ComponentsModule {}
