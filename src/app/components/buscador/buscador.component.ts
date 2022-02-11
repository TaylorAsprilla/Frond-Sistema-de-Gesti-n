import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() placeholder: string = '';
  @Input() validaInput: boolean = false;

  @Output() onTerminoBusqueda = new EventEmitter<string>();

  busquedaUno: any;
  busquedaDos: any;

  mostrarError: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  validaCampoBusqueda(termino: string) {
    if (!!this.validaInput) {
      this.busquedaUno = document.getElementById('busquedaUno');
      this.busquedaDos = document.getElementById('busquedaDos');
      this.mostrarError = false;

      if (this.busquedaUno.value !== this.busquedaDos.value) {
        this.mostrarError = true;
      } else {
        this.buscarUsuario(termino);
      }
    } else {
      this.buscarUsuario(termino);
    }
  }

  buscarUsuario(termino: string) {
    if (!this.mostrarError) {
      this.onTerminoBusqueda.emit(termino);
    } else {
      return;
    }
  }
}
