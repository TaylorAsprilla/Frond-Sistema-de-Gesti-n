import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { delay, ignoreElements } from 'rxjs/operators';
import { CampoModel } from 'src/app/models/campo.model';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { CampoService } from 'src/app/services/campo/campo.service';
import { CongregacionService } from 'src/app/services/congregacion/congregacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mantenimiento-campos',
  templateUrl: './mantenimiento-campos.component.html',
  styleUrls: ['./mantenimiento-campos.component.css'],
})
export class MantenimientoCamposComponent implements OnInit, OnDestroy {
  public campoForm: FormGroup;

  public congregaciones: CongregacionModel[] = [];
  public congregacionSeleccionada: CongregacionModel;

  public campoSeleccionado: CampoModel;

  public congregacionSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private congregacionServices: CongregacionService,
    private campoService: CampoService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRouter.params.subscribe(({ id }) => {
      this.cargarCampo(id);
    });

    this.campoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: [''],
      telefono: [''],
      id_congregacion: ['', Validators.required],
    });

    this.congregacionSubscription = this.congregacionServices
      .listarCongregaciones()
      .subscribe((congregacion: CongregacionModel[]) => {
        this.congregaciones = congregacion;
      });

    this.existeCongregacion();
  }

  ngOnDestroy(): void {
    this.congregacionSubscription?.unsubscribe();
  }

  existeCongregacion() {
    this.campoForm.get('id_congregacion').valueChanges.subscribe((idCongregacion) => {
      this.congregacionSeleccionada = this.congregaciones.find(
        (congregacion) => congregacion.id.toString() === idCongregacion.toString()
      );
    });
  }

  guardarCampo() {
    const campoNuevo = this.campoForm.value;

    if (this.campoSeleccionado) {
      const data = {
        ...this.campoForm.value,
        id: this.campoSeleccionado.id,
      };
      this.campoService.actualizarCampo(data).subscribe((campoActualizado: any) => {
        Swal.fire(
          'Campo Actualizado',
          `${campoActualizado.campoActualizado.nombre} actualizado correctamente`,
          'success'
        );
      });
    } else {
      this.campoService.crearCampo(campoNuevo).subscribe((campoCreado: any) => {
        Swal.fire('Campo Creado', `${campoCreado.campo.nombre} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/campo/${campoCreado.campo.id}`);
      });
    }
  }

  cargarCampo(id: string) {
    if (id !== 'nuevo') {
      this.campoService
        .getCampo(id)
        .pipe(delay(100))
        .subscribe(
          (campo: CampoModel) => {
            const { nombre, direccion, telefono, id_congregacion } = campo;

            this.campoSeleccionado = campo;
            // this.existeCongregacion();

            this.campoForm.setValue({ nombre, direccion, telefono, id_congregacion });
          },
          (error) => {
            return this.router.navigateByUrl(`/dashboard/campos`);
          }
        );
    } else {
      return;
    }
  }
}
