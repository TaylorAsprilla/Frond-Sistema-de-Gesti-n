import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CampoModel } from 'src/app/models/campo.model';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { CampoService } from 'src/app/services/campo/campo.service';
import { CongregacionService } from 'src/app/services/congregacion/congregacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-campos',
  templateUrl: './campos.component.html',
  styleUrls: ['./campos.component.css'],
})
export class CamposComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public campos: CampoModel[] = [];
  public congregaciones: CongregacionModel[] = [];
  public nombreCongregaciones: string[] = [];

  public camposSubscription: Subscription;
  public congregacionesSubscription: Subscription;

  constructor(private campoServices: CampoService, private congregacionServices: CongregacionService) {}

  ngOnInit(): void {
    this.congregacionesSubscription = this.congregacionServices
      .listarCongregaciones()
      .subscribe((congregaciones: CongregacionModel[]) => {
        this.congregaciones = congregaciones;
      });
    if (!!this.congregacionesSubscription) {
      this.cargarCampos();
    }
  }

  cargarCampos() {
    this.cargando = true;
    this.camposSubscription = this.campoServices.listarCampos().subscribe((campos: CampoModel[]) => {
      this.campos = campos;
      this.cargando = false;

      this.campos.forEach((campo) => {
        this.congregaciones.forEach((congregacion) => {
          if (campo.id_congregacion.toString() === congregacion.id) {
            this.nombreCongregaciones.push(congregacion.nombre);
          }
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.camposSubscription?.unsubscribe();
  }

  borrarCampo(campo: CampoModel) {
    Swal.fire({
      title: '¿Borrar Campo?',
      text: `Esta seguro de borrar el campo de ${campo.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.campoServices.elimiminarCampo(campo).subscribe((campoEliminado) => {
          Swal.fire('¡Deshabilitado!', `${campo.nombre} fue deshabilitado correctamente`, 'success');

          this.cargarCampos();
        });
      }
    });
  }
}
