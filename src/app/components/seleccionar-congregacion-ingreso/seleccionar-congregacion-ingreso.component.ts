import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { CongregacionService } from 'src/app/services/congregacion/congregacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seleccionar-congregacion-ingreso',
  templateUrl: './seleccionar-congregacion-ingreso.component.html',
  styleUrls: ['./seleccionar-congregacion-ingreso.component.css'],
})
export class SeleccionarCongregacionIngresoComponent implements OnInit, OnDestroy {
  @Output() onNombreCongregacionIngreso = new EventEmitter<string>();
  congregaciones: CongregacionModel[] = [];

  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;

  seleccionarCongregacionFormGroup: FormGroup;

  congregacionSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private congregacionService: CongregacionService) {}

  ngOnInit(): void {
    this.primerNombre = localStorage.getItem('primer_nombre');
    this.segundoNombre = localStorage.getItem('segundo_nombre');
    this.primerApellido = localStorage.getItem('primer_apellido');
    this.segundoApellido = localStorage.getItem('segundo_apellido');

    this.congregacionSubscription = this.congregacionService.listarCongregaciones().subscribe((congregaciones) => {
      this.congregaciones = congregaciones.filter((congregacion) => congregacion.estado === true);
    });

    this.seleccionarCongregacionFormGroup = this.formBuilder.group({
      id_congregacion: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.congregacionSubscription?.unsubscribe();
  }

  guardarRegistroCongregacion() {
    const idCongregacion = this.seleccionarCongregacionFormGroup.get('id_congregacion').value;

    const nombreCongregacion = this.congregaciones.find(
      (congregacion: CongregacionModel) => congregacion.id.toString() === idCongregacion.toString()
    );

    Swal.fire({
      html: `Inicio de ingresos en la Congregación: <b>${nombreCongregacion.nombre}</b>`,
      icon: 'success',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('congregacion_ingreso', idCongregacion);
        this.onNombreCongregacionIngreso.emit(nombreCongregacion.nombre);
      } else if (result.dismiss) {
        localStorage.removeItem('congregacion_ingreso');
      }
    });
  }
}
