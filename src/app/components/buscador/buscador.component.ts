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

  @Output() onTerminoBusqueda = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  buscarUsuario(termino: string) {
    this.onTerminoBusqueda.emit(termino);
  }
}
