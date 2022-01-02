import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup;
  public usuario: UsuarioModel;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.formBuilder.group({
      primer_nombre: [this.usuario.primer_nombre, [Validators.required, Validators.minLength(3)]],
      segundo_nombre: [this.usuario.segundo_nombre, [Validators.minLength(3)]],
      primer_apellido: [this.usuario.primer_apellido, [Validators.required, Validators.minLength(3)]],
      segundo_apellido: [this.usuario.segundo_apellido, [Validators.minLength(3)]],
      id_tipoDocumento: [this.usuario.tipo_documento, [Validators.required]],
      numero_documento: [this.usuario.numero_documento, [Validators.required, Validators.minLength(3)]],
      fecha_nacimiento: [this.usuario.fecha_nacimiento, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      celular: [this.usuario.celular, [Validators.minLength(3)]],
      id_genero: [this.usuario.genero, [Validators.required]],
      id_vacuna: [this.usuario.vacuna, [Validators.required]],
      imagen: [this.usuario.imagenUrl, []],
      id_congregacion: [this.usuario.congregacion, [Validators.required]],
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarUsuario(this.perfilForm.value).subscribe((usuarioActualizado) => {
      const { primer_nombre, primer_apellido, email } = this.perfilForm.value;
      this.usuario.primer_nombre = primer_nombre;
      this.usuario.primer_apellido = primer_apellido;
      this.usuario.email = email;

      this.changeDetectorRef.detectChanges();
    });
  }
}
