import { Component, Input, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subir-carnet',
  templateUrl: './subir-carnet.component.html',
  styleUrls: ['./subir-carnet.component.css'],
})
export class SubirCarnetComponent implements OnInit {
  @Input() idUsuario: string;
  @Input() imagenCarnet: string;
  @Input() usuario: UsuarioModel;

  public imagenSubir: File;
  public imagenTemporal: string | ArrayBuffer;
  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {}

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'PNG', 'JPEG', 'JPG'];
    if (!extensionesValidas.includes(file.name.split('.').pop())) {
      Swal.fire('Error', `El documento no contiene una extensión válida ( ${extensionesValidas} )`, 'error');
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
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'carnets', this.idUsuario).then((imagenNueva) => {
      if (imagenNueva) {
        this.usuario.carnet = imagenNueva;
        Swal.fire('Carnet Actualizado', 'El carnet ha sido actualizado, registro exitoso', 'success');
      } else {
        Swal.fire('Imagen', 'No se pudo subir la imagen', 'error');
      }
    });
  }
}
