import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MinisterioModel } from 'src/app/models/ministerio.model';
import { BusquedasService } from 'src/app/services/busquedas/busquedas.service';
import { MinisterioService } from 'src/app/services/ministerio/ministerio.service';
import { ModalImagenService } from 'src/app/services/modal-imagen/modal-imagen.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ministerios',
  templateUrl: './ministerios.component.html',
  styleUrls: ['./ministerios.component.css'],
})
export class MinisteriosComponent implements OnInit, OnDestroy {
  public ministerios: MinisterioModel[] = [];
  public cargando: boolean = true;
  public imagenSusbcription: Subscription;
  public ministeriosTemporales: MinisterioModel[] = [];

  constructor(
    private ministerioService: MinisterioService,
    private modalImagenServices: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarMinisterios();
    this.imagenSusbcription = this.modalImagenServices.nuevaImagen.subscribe((nuevaimagen) => {
      this.cargarMinisterios();
    });
  }

  ngOnDestroy(): void {
    this.imagenSusbcription.unsubscribe();
  }

  cargarMinisterios() {
    this.cargando = true;
    this.ministerioService.listarMinisterios().subscribe((ministerios: MinisterioModel[]) => {
      this.ministerios = ministerios;
      this.ministeriosTemporales = ministerios;
      this.cargando = false;
    });
  }

  guardarCambios(ministerio: MinisterioModel) {
    this.ministerioService.actualizarMinisterio(ministerio).subscribe((respuesta) => {
      Swal.fire('Actualizado', ministerio.nombre, 'success');
    });
  }

  elimininarMinisterio(ministerio: MinisterioModel) {
    this.ministerioService.elimiminarMinisterio(ministerio).subscribe((respuesta) => {
      Swal.fire('Deshabilitado', ministerio.nombre, 'success');
      this.cargarMinisterios();
    });
  }

  async crearMinisterio() {
    const { value: formValues = '' } = await Swal.fire({
      title: 'Crear un Ministerio',
      html:
        '<input id="nombre" class="swal2-input" placeholder="Nombre del Ministerio" required>' +
        '<input id="descripcion" class="swal2-input" placeholder="Descripción">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('nombre')).value,
          (<HTMLInputElement>document.getElementById('descripcion')).value,
        ];
      },
    });

    if (formValues.length) {
      let ministerio = new MinisterioModel(null, formValues[0].toString(), true, '', formValues[1].toString());
      this.ministerioService.crearMinisterio(ministerio).subscribe((respuesta: any) => {
        this.ministerios.push(respuesta.ministerio);
      });
    }

    if (formValues) {
      Swal.fire(JSON.stringify(formValues));
    }
  }

  cambiarLogo(ministerio: MinisterioModel) {
    this.modalImagenServices.abrirModal(ministerio.id, 'ministerios', ministerio.logo);
  }

  buscarMinisterio(termino: string) {
    if (termino.length === 0) {
      this.ministerios = this.ministeriosTemporales;
    } else {
      this.busquedasService.buscarMinisterio(termino).subscribe((ministerios: any) => {
        this.ministerios = ministerios;
      });
    }
  }
}
