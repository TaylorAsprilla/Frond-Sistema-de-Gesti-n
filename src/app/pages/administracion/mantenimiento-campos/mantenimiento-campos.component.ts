import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { CongregacionService } from 'src/app/services/congregacion/congregacion.service';

@Component({
  selector: 'app-mantenimiento-campos',
  templateUrl: './mantenimiento-campos.component.html',
  styleUrls: ['./mantenimiento-campos.component.css'],
})
export class MantenimientoCamposComponent implements OnInit {
  public campoForm: FormGroup;

  public congregaciones: CongregacionModel[] = [];

  public congregacionSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private congregacionServices: CongregacionService) {}

  ngOnInit(): void {
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
  }

  guardarCampo() {
    console.log(this.campoForm.value);
  }
}
