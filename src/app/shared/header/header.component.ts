import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { UsuarioModel } from 'src/app/models/usuario.model';

import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { environment } from 'src/environments/environment';
declare var $: any;
const imagenes_url = environment.imagenes_url;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  fabars = faBars;

  public usuario: UsuarioModel;
  public primerNombre: string;
  public segundoNombre: string;
  public primerApellido: string;
  public segundoApellido: string;
  public numeroDocumento: string;
  public email: string;
  public imagen: string;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.primerNombre = sessionStorage.getItem('primer_nombre');
    this.segundoNombre = sessionStorage.getItem('segundo_nombre');
    this.primerApellido = sessionStorage.getItem('primer_apellido');
    this.segundoApellido = sessionStorage.getItem('segundo_apellido');
    this.email = sessionStorage.getItem('email');
    this.imagen = sessionStorage.getItem('imagen');

    $('.search-box a, .search-box .app-search .srh-btn').on('click', function () {
      $('.app-search').toggle(200);
    });
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

  logout() {
    this.usuarioService.logout();
  }

  changeStatusMenu() {
    $('[data-widget="pushmenu"]').PushMenu('toggle');
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.router.navigateByUrl('/sistema');
    } else {
      this.router.navigateByUrl(`/sistema/buscar/${termino}`);
    }
  }
}
