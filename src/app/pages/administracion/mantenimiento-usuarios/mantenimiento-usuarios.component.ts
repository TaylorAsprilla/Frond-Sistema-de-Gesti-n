import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { CampoService } from 'src/app/services/campo/campo.service';
import { CongregacionService } from 'src/app/services/congregacion/congregacion.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mantenimiento-usuarios',
  templateUrl: './mantenimiento-usuarios.component.html',
  styleUrls: ['./mantenimiento-usuarios.component.css'],
})
export class MantenimientoUsuariosComponent implements OnInit {
  public usuarioForm: FormGroup;

  public usuarios: UsuarioModel[] = [];
  public usuarioSeleccionado: UsuarioModel;
  public congregaciones: CongregacionModel[] = [];

  public usuarioSubscription: Subscription;
  public congregacionesSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioServices: UsuarioService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private campoServices: CampoService,
    private congregacionServices: CongregacionService
  ) {}

  ngOnInit(): void {
    this.activateRouter.params.subscribe(({ id }) => {
      this.crearUsuario(id);
    });

    this.usuarioForm = this.formBuilder.group({
      primer_nombre: ['', [Validators.required, Validators.minLength(3)]],
      segundo_nombre: ['', [Validators.minLength(3)]],
      primer_apellido: ['', [Validators.required, Validators.minLength(3)]],
      segundo_apellido: ['', [Validators.minLength(3)]],
      id_tipoDocumento: ['', [Validators.required]],
      numero_documento: ['', [Validators.required, Validators.minLength(3)]],
      fecha_nacimiento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.minLength(3)]],
      id_genero: ['', [Validators.required]],
      id_vacuna: ['', [Validators.required]],
      imagen: ['', []],
      id_congregacion: ['', [Validators.required]],
      campo: ['', []],
      terminos: ['', [Validators.required]],
    });

    this.usuarioSubscription = this.usuarioServices.listarUsuarios().subscribe(({ totalUsuarios, usuarios }) => {
      this.usuarios = usuarios;
    });

    this.congregacionesSubscription = this.congregacionServices
      .listarCongregaciones()
      .subscribe((congregaciones: CongregacionModel[]) => {
        this.congregaciones = congregaciones;
      });
    // if (!!this.congregacionesSubscription) {
    //   this.cargarCampos();
    // }
  }

  guardarUsuario() {
    const usuarioNuevo = this.usuarioForm.value;

    if (this.usuarioSeleccionado) {
      this.usuarioServices.actualizarUsuario(usuarioNuevo).subscribe((usuarioActualizado: any) => {
        Swal.fire(
          'Usaurio Actualizado',
          `${usuarioActualizado.congregacionActualizada.nombre} actualizada correctamente`,
          'success'
        );
      });
    } else {
      this.usuarioServices.crearUsuario(usuarioNuevo).subscribe((usuarioCreado: any) => {
        Swal.fire('Usuario creado', `${usuarioCreado.congregacion.nombre} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/usuario/${usuarioCreado.congregacion.id}`);
      });
    }
  }

  crearUsuario(id: string) {
    if (id !== 'nuevo') {
      this.usuarioServices.getUsuario(id).subscribe(
        (usuario: UsuarioModel) => {
          const {
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            id_tipoDocumento,
            numero_documento,
            fecha_nacimiento,
            email,
            celular,
            id_genero,
            vacuna,
            imagen,
            id_congregacion,
          } = usuario;
          this.usuarioSeleccionado = usuario;

          this.usuarioForm.setValue({
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            id_tipoDocumento,
            numero_documento,
            fecha_nacimiento,
            email,
            celular,
            id_genero,
            vacuna,
            imagen,
            id_congregacion,
          });
        },
        (error) => {
          return this.router.navigateByUrl(`/dashboard/usuarios`);
        }
      );
    } else {
      return;
    }
  }
}
