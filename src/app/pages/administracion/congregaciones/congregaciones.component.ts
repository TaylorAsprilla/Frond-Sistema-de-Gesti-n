import { Component, OnInit } from '@angular/core';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { CongregacionService } from 'src/app/services/congregacion/congregacion.service';

@Component({
  selector: 'app-congregaciones',
  templateUrl: './congregaciones.component.html',
  styleUrls: ['./congregaciones.component.css'],
})
export class CongregacionesComponent implements OnInit {
  public cargando: boolean = true;
  public congregaciones: CongregacionModel[] = [];

  constructor(private congregacionServices: CongregacionService) {}

  ngOnInit(): void {
    this.cargarCongregaciones();
  }

  cargarCongregaciones() {
    this.cargando = true;
    this.congregacionServices.listarCongregaciones().subscribe((congregaciones: CongregacionModel[]) => {
      this.congregaciones = congregaciones;
      this.cargando = false;
    });
  }
}
