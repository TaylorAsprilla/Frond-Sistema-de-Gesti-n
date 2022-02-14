import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';

import { UsuarioService } from 'src/app/services/usuario/usuario.service';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public usuario: UsuarioModel;
  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    $('.search-box a, .search-box .app-search .srh-btn').on('click', function () {
      $('.app-search').toggle(200);
    });
  }

  logout() {
    this.usuarioService.logout();
  }

  changeStatusMenu() {
    $('[data-widget="pushmenu"]').PushMenu('toggle');
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
    }
  }
}
