import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-carnet-vacunacion',
  templateUrl: './carnet-vacunacion.component.html',
  styleUrls: ['./carnet-vacunacion.component.scss'],
})
export class CarnetVacunacionComponent implements OnInit, OnChanges {
  @Input() busquedaUsuario: UsuarioModel[] = [];

  ingreso: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.busquedaUsuario);
    // console.log(changes.busquedaUsuario.currentValue[0].id_dosis >= 2);
    if (changes.busquedaUsuario) {
      if (
        (changes.busquedaUsuario.currentValue[0]?.id_vacuna === 4 ||
          changes.busquedaUsuario.currentValue[0]?.id_dosis >= 2) &&
        !!changes.busquedaUsuario.currentValue[0]?.carnet
      ) {
        this.ingreso = true;
      } else {
        this.ingreso = false;
      }
    }
  }
}
