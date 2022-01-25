import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';

import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public imagenUrl = '';
  public primerNombre: string = '';
  public primerApellido: string = '';
  public email: string = '';

  public usuario: UsuarioModel;

  constructor(private sidebarService: SidebarService, private usuarioService: UsuarioService) {
    this.menuItems = this.sidebarService.menu;
  }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    this.imagenUrl = this.usuario.imagenUrl;
    this.primerNombre = this.usuario.primer_nombre;
    this.primerApellido = this.usuario.primer_apellido;
  }
}
