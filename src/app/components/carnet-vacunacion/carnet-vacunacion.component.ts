import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { IngresoModel } from 'src/app/models/ingreso.model';
import { UsuarioModel } from 'src/app/models/usuario.model';

import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carnet-vacunacion',
  templateUrl: './carnet-vacunacion.component.html',
  styleUrls: ['./carnet-vacunacion.component.scss'],
})
export class CarnetVacunacionComponent {
  @Input() busquedaUsuario: UsuarioModel[] = [];
  @Input() todosLosUsuarios: UsuarioModel[] = [];
  @Input() congregacionIngreso: string = '';
  @Input() ingresos: IngresoModel[] = [];
  @Output() onIngresoUsuario = new EventEmitter<string>();

  voluntario: UsuarioModel;
  fecha = new Date().toLocaleDateString('en-CA');

  constructor(private ingresoServices: IngresoService, private router: Router) {}

  darIngreso() {
    let idVoluntario = localStorage.getItem('idUsuario');
    let idUsuario = this.busquedaUsuario[0].id;
    let congregacionIngreso = localStorage.getItem('congregacion_ingreso');
    let primerNombre = this.busquedaUsuario[0]?.primer_nombre ? this.busquedaUsuario[0]?.primer_nombre : '';
    let segundoNombre = this.busquedaUsuario[0].segundo_nombre ? this.busquedaUsuario[0].segundo_nombre : '';
    let primerApellido = this.busquedaUsuario[0]?.primer_apellido ? this.busquedaUsuario[0]?.primer_apellido : '';
    let segundoApellido = this.busquedaUsuario[0]?.segundo_apellido ? this.busquedaUsuario[0]?.segundo_apellido : '';

    this.ingresoServices.crearIngreso(idVoluntario, idUsuario, congregacionIngreso, this.fecha).subscribe(
      (ingresoCreado: any) => {
        Swal.fire({
          title: '¡Ingreso Exitoso!',
          html: `Bienvenido <b>${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}</b>
                  <br> a la congregación de <b>${this.congregacionIngreso}</b> <p></p>
                  <b>Fecha:</b> ${this.fecha}`,

          icon: 'success',
        });
        this.onIngresoUsuario.emit(idUsuario);
      },
      (err) => {
        if (!err.error.noToken) {
          Swal.fire({
            html: err.error.msg,
            icon: 'warning',
          });
          this.onIngresoUsuario.emit();
        } else {
          Swal.fire({
            html: 'Debe iniciar sesión',
            icon: 'error',
          });
          this.router.navigateByUrl('/login');
        }
      }
    );
  }

  volverAlRegistro() {
    this.router.navigateByUrl(`/registro`);
  }
}
