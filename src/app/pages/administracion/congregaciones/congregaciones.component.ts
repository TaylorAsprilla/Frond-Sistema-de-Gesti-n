import { Component, OnInit } from '@angular/core';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { CongregacionService } from 'src/app/services/congregacion/congregacion.service';
import Swal from 'sweetalert2';

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

  borrarCongregacion(congregacion: CongregacionModel) {
    Swal.fire({
      title: '¿Borrar Congregación?',
      text: `Esta seguro de borrar la congregación de ${congregacion.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.congregacionServices.elimiminarCongregacion(congregacion).subscribe((congregacionEliminado) => {
          Swal.fire('¡Deshabilitado!', `${congregacion.nombre} fue deshabilitado correctamente`, 'success');

          this.cargarCongregaciones();
        });
      }
    });
  }
}
