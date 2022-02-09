import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { CongregacionService } from 'src/app/services/congregacion/congregacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-congregacion',
  templateUrl: './mantenimiento-congregacion.component.html',
  styleUrls: ['./mantenimiento-congregacion.component.css'],
})
export class MantenimientoCongregacionComponent implements OnInit {
  public congregacionForm: FormGroup;

  public congregaciones: CongregacionModel[] = [];
  public congregacionSeleccionada: CongregacionModel;

  public congregacionSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private congregacionServices: CongregacionService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRouter.params.subscribe(({ id }) => {
      this.crearCongregacion(id);
    });

    this.congregacionForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: [''],
      telefono: [''],
    });

    this.congregacionSubscription = this.congregacionServices
      .listarCongregaciones()
      .subscribe((congregacion: CongregacionModel[]) => {
        this.congregaciones = congregacion;
      });
  }

  ngOnDestroy(): void {
    this.congregacionSubscription?.unsubscribe();
  }

  guardarCongregacion() {
    const congregacionNueva = this.congregacionForm.value;

    if (this.congregacionSeleccionada) {
      this.congregacionServices.actualizarCongregacion(congregacionNueva).subscribe((congregacionActualizada: any) => {
        Swal.fire(
          'Congregación Actualizada',
          `${congregacionActualizada.congregacionActualizada.nombre} actualizada correctamente`,
          'success'
        );
      });
    } else {
      this.congregacionServices.crearCongregacion(congregacionNueva).subscribe((congregacionCreada: any) => {
        Swal.fire('Congregacion Creada', `${congregacionCreada.congregacion.nombre} creada correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/congregacion/${congregacionCreada.congregacion.id}`);
      });
    }
  }

  crearCongregacion(id: string) {
    if (id !== 'nuevo') {
      this.congregacionServices.getCongregacion(id).subscribe(
        (congregacion: CongregacionModel) => {
          const { nombre, direccion, telefono } = congregacion;
          this.congregacionSeleccionada = congregacion;
          this.congregacionForm.setValue({ nombre, direccion, telefono });
        },
        (error) => {
          return this.router.navigateByUrl(`/dashboard/congregaciones`);
        }
      );
    } else {
      return;
    }
  }
}
