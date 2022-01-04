import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css'],
})
export class ModalImagenComponent implements OnInit {
  public usuario: UsuarioModel;
  public imagenSubir: File;
  public imagenTemporal: string | ArrayBuffer;

  constructor(public modalImagenServices: ModalImagenService, private fileUploadService: FileUploadService) {}

  ngOnInit(): void {}

  cerrarModal(): void {
    this.modalImagenServices.cerrarModal();
    this.imagenTemporal = null;
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(file.name.split('.').pop())) {
      Swal.fire('Error', `El fichero no contiene una extension válida ( ${extensionesValidas} )`, 'error');
      return (this.imagenTemporal = null);
    }

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.imagenTemporal = reader.result.toString();
      };
    } else {
      return (this.imagenTemporal = null);
    }
  }

  subirImagen() {
    const id = this.modalImagenServices.id;
    const tipo = this.modalImagenServices.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id).then((imagenNueva) => {
      if (imagenNueva) {
        Swal.fire('Imagen Actualizada', 'Imagen de usuario actualizada', 'success');

        this.modalImagenServices.nuevaImagen.emit(imagenNueva);
        this.cerrarModal();
      } else {
        Swal.fire('Imagen', 'No se pudo subir la imagen', 'error');
      }
    });
  }
}
