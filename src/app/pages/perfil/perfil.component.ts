import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup;
  public usuario: UsuarioModel;
  public imagenSubir: File;
  public imagenTemporal: string | ArrayBuffer;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.formBuilder.group({
      primer_nombre: [this.usuario.primer_nombre, [Validators.required, Validators.minLength(3)]],
      segundo_nombre: [this.usuario.segundo_nombre, [Validators.minLength(3)]],
      primer_apellido: [this.usuario.primer_apellido, [Validators.required, Validators.minLength(3)]],
      segundo_apellido: [this.usuario.segundo_apellido, [Validators.minLength(3)]],
      id_tipoDocumento: [this.usuario.id_tipoDocumento, [Validators.required]],
      numero_documento: [this.usuario.numero_documento, [Validators.required, Validators.minLength(3)]],
      fecha_nacimiento: [this.usuario.fecha_nacimiento, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      celular: [this.usuario.celular, [Validators.minLength(3)]],
      id_genero: [this.usuario.id_genero, [Validators.required]],
      id_vacuna: [this.usuario.vacuna, [Validators.required]],
      imagen: [this.usuario.imagenUrl, []],
      id_congregacion: [this.usuario.id_congregacion, [Validators.required]],
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarUsuario(this.perfilForm.value, this.usuario.id).subscribe(
      (usuarioActualizado) => {
        const { primer_nombre, primer_apellido, email } = this.perfilForm.value;
        this.usuario.primer_nombre = primer_nombre;
        this.usuario.primer_apellido = primer_apellido;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Los datos del usuario se actualizaron', 'success');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
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
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.id).then((imagenNueva) => {
      if (imagenNueva) {
        this.usuario.imagen = imagenNueva;
        Swal.fire('Imagen Actualizada', 'Imagen de usuario actualizada', 'success');
      } else {
        Swal.fire('Imagen', 'No se pudo subir la imagen', 'error');
      }
    });
  }
}
