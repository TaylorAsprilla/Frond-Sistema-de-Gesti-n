import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { PermisosDirective } from './permisos/permisos.directive';

@NgModule({
  declarations: [PermisosDirective],
  imports: [CommonModule, BrowserModule, AppRoutingModule],
  exports: [PermisosDirective],
})
export class DirectiveModule {}
