import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CampoModel } from 'src/app/models/campo.model';
import { CampoService } from 'src/app/services/campo/campo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-campos',
  templateUrl: './campos.component.html',
  styleUrls: ['./campos.component.css'],
})
export class CamposComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public campos: CampoModel[] = [];
  public camposSubscription: Subscription;

  constructor(private campoServices: CampoService) {}

  ngOnInit(): void {
    this.cargarCampos();
  }

  ngOnDestroy(): void {
    this.camposSubscription?.unsubscribe();
  }

  cargarCampos() {
    this.cargando = true;
    this.camposSubscription = this.campoServices.listarCampos().subscribe((campos: CampoModel[]) => {
      this.campos = campos;
      this.cargando = false;
    });
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
