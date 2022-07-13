import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { PermisoEnum } from 'src/app/services/sidebar/sidebar.service';

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
  get PermisoEnum() {
    return PermisoEnum;
  }

  fabars = faBars;

  public usuario: UsuarioModel;
  public primerNombre: string;
  public segundoNombre: string;
  public primerApellido: string;
  public segundoApellido: string;
  public numeroDocumento: string;
  public email: string;
  public imagen: string;
  public idUsuario: string;
  public usuarioLogueado: string;

  public usuarioSubscription: Subscription;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.primerNombre = localStorage.getItem('primer_nombre');
    this.segundoNombre = localStorage.getItem('segundo_nombre');
    this.primerApellido = localStorage.getItem('primer_apellido');
    this.segundoApellido = localStorage.getItem('segundo_apellido');
    this.email = localStorage.getItem('email');
    this.imagen = localStorage.getItem('imagen');
    this.idUsuario = localStorage.getItem('idUsuario');

    $('.search-box a, .search-box .app-search .srh-btn').on('click', function () {
      $('.app-search').toggle(200);
    });
  }

  get imagenSession() {
    if (!this.imagen) {
      return `${imagenes_url}/uploads/no-image.jpg`;
    } else if (this.imagen) {
      return `${imagenes_url}/uploads/usuarios/${localStorage.getItem('imagen')}`;
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
