import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { CongregacionService } from 'src/app/services/congregacion/congregacion.service';

@Component({
  selector: 'app-seleccionar-congregacion-ingreso',
  templateUrl: './seleccionar-congregacion-ingreso.component.html',
  styleUrls: ['./seleccionar-congregacion-ingreso.component.css'],
})
export class SeleccionarCongregacionIngresoComponent implements OnInit, OnDestroy {
  congregaciones: CongregacionModel[] = [];

  seleccionarCongregacionFormGroup: FormGroup;

  congregacionSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private congregacionService: CongregacionService) {}

  ngOnInit(): void {
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
    sessionStorage.setItem('congregacion_ingreso', idCongregacion);
  }
}
