import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carnet-vacunacion',
  templateUrl: './carnet-vacunacion.component.html',
  styleUrls: ['./carnet-vacunacion.component.scss'],
})
export class CarnetVacunacionComponent implements OnInit, OnChanges {
  @Input() busquedaUsuario: UsuarioModel[] = [];
  @Output() onIngresoUsuario = new EventEmitter<string>();

  ingreso: boolean = false;

  voluntario: UsuarioModel;

  constructor(private ingresoServices: IngresoService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
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

  darIngreso() {
    let idVoluntario = sessionStorage.getItem('idUsuario');
    let idUsuario = this.busquedaUsuario[0].id;
    let primerNombre = this.busquedaUsuario[0].primer_nombre;
    let segundoNombre = this.busquedaUsuario[0].segundo_nombre;
    let primerApellido = this.busquedaUsuario[0].primer_apellido;
    let segundoApellido = this.busquedaUsuario[0].segundo_apellido;

    this.ingresoServices.crearIngreso(idVoluntario, idUsuario).subscribe((ingresoCreado: any) => {
      Swal.fire(
        '¡Ingreso Exitoso!',
        `Bienvenido ${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}`,
        'success'
      );
    });
    this.onIngresoUsuario.emit(idUsuario);
  }
}
