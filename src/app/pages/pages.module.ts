import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos propios
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { MinisteriosComponent } from './administracion/ministerios/ministerios.component';
import { PipesModule } from '../pipes/pipes.module';
import { CongregacionesComponent } from './administracion/congregaciones/congregaciones.component';

@NgModule({
  declarations: [
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    PagesComponent,
    PromesasComponent,
    RxjsComponent,
    NopagefoundComponent,
    PerfilComponent,
    UsuariosComponent,
    MinisteriosComponent,
    CongregacionesComponent,
  ],
  exports: [DashboardComponent, Grafica1Component, ProgressComponent, PagesComponent, NopagefoundComponent],

  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule, ComponentsModule, PipesModule],
})
export class PagesModule {}
