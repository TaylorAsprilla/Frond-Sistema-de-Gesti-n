import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';

import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public imagenUrl = '';
  public primerNombre: string = '';
  public primerApellido: string = '';
  public email: string = '';

  public usuario: UsuarioModel;
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    this.imagenUrl = this.usuario.imagenUrl;
    this.primerNombre = this.usuario.primer_nombre;
    this.primerApellido = this.usuario.primer_apellido;
    this.email = this.usuario.email;
  }

  logout() {
    this.usuarioService.logout();
  }
}
