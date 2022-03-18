import { Component, Input, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-carnet-vacunacion',
  templateUrl: './carnet-vacunacion.component.html',
  styleUrls: ['./carnet-vacunacion.component.scss'],
})
export class CarnetVacunacionComponent implements OnInit {
  @Input() busquedaUsuario: UsuarioModel[] = [];

  constructor() {}

  ngOnInit(): void {}
}
