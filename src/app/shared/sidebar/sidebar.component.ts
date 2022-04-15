import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';

import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import * as $ from 'jquery';
import * as AdminLte from 'admin-lte';
import { environment } from 'src/environments/environment';

const imagenes_url = environment.imagenes_url;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public imagenUrl = '';
  public primerNombre: string = '';
  public primerApellido: string = '';
  public email: string = '';
  public imagen: string;

  public usuario: UsuarioModel;

  constructor(private sidebarService: SidebarService, private usuarioService: UsuarioService) {
    this.menuItems = this.sidebarService.menu;
  }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    this.primerNombre = sessionStorage.getItem('primer_nombre');
    this.primerApellido = sessionStorage.getItem('primer_apellido');
    this.imagen = sessionStorage.getItem('imagen');
  }

  get imagenSession() {
    if (!this.imagen) {
      return `${imagenes_url}/uploads/no-image.jpg`;
    } else if (this.imagen) {
      return `${imagenes_url}/uploads/usuarios/${sessionStorage.getItem('imagen')}`;
    } else {
      return `${imagenes_url}/uploads/no-image.jpg`;
    }
  }

  ngAfterViewInit() {
    $('[data-widget="treeview"]').each(function () {
      AdminLte.Treeview._jQueryInterface.call($(this), 'init');
    });
  }
}
