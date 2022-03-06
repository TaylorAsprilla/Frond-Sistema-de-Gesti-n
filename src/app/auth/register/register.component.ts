import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';
import { CongregacionService } from 'src/app/services/congregacion/congregacion.service';
import { Subscription } from 'rxjs';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { CampoService } from 'src/app/services/campo/campo.service';
import { CampoModel } from 'src/app/models/campo.model';
import { TipoDocumentoModel } from 'src/app/models/tipo-documento.model';
import { TipoDocumentoService } from 'src/app/services/tipo-documento/tipo-documento.service';
import { VacunaService } from 'src/app/services/vacuna/vacuna.service';
import { VacunaModel } from 'src/app/models/vacuna.model';
import { GeneroModel } from 'src/app/models/genero.model';
import { GeneroService } from 'src/app/services/genero/genero.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas/busquedas.service';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public formSubmitted: boolean = false;
  registroUnoFormGroup!: FormGroup;
  registroDosFormGroup!: FormGroup;
  registroTresFormGroup!: FormGroup;
  registroUno_step = false;
  registroDos_step = false;
  registroTres_step = false;
  step = 1;

  congregaciones: CongregacionModel[];
  congregacionSeleccionada: number;
  campos: CampoModel[];
  camposFiltrados: CampoModel[] = [];
  tipoDocumentos: TipoDocumentoModel[] = [];
  vacunas: VacunaModel[] = [];
  generos: GeneroModel[] = [];
  usuarios: UsuarioModel[] = [];
  usuarioSeleccionado: UsuarioModel;

  idUsuario: string = null;
  public imagenCarnet: any;
  usuario: UsuarioModel;

  titulo: string;
  placeholder: string;
  existeUsuario: boolean = false;
  usuarioRegistrado: boolean = false;
  subirCarnet: boolean = false;

  congregacionSubscription: Subscription;
  campoSubscription: Subscription;
  tipoDocumentoSubscription: Subscription;
  vacunaSubscription: Subscription;
  generoSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private congregacionService: CongregacionService,
    private campoService: CampoService,
    private tipoDocumentoService: TipoDocumentoService,
    private vacunaService: VacunaService,
    private generoService: GeneroService,
    private busquedasService: BusquedasService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.titulo = 'Ingrese su número de documento';
    this.placeholder = 'Número de documento';

    // Formularios
    this.registroUnoFormGroup = this.formBuilder.group({
      primer_nombre: ['', [Validators.required, Validators.minLength(3)]],
      segundo_nombre: ['', [Validators.minLength(3)]],
      primer_apellido: ['', [Validators.required, Validators.minLength(3)]],
      segundo_apellido: ['', [Validators.minLength(3)]],
      id_tipoDocumento: ['', [Validators.required]],
      numero_documento: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.registroDosFormGroup = this.formBuilder.group({
      fecha_nacimiento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.minLength(3)]],
      id_genero: ['', [Validators.required]],
    });

    this.registroTresFormGroup = this.formBuilder.group({
      id_vacuna: ['', [Validators.required]],
      id_congregacion: ['', [Validators.required]],
      campo: ['', []],
      terminos: [true, [Validators.required]],
    });

    this.congregacionSubscription = this.congregacionService.listarCongregaciones().subscribe((congregacion) => {
      this.congregaciones = congregacion;
    });

    this.campoSubscription = this.campoService.listarCampos().subscribe((campos: CampoModel[]) => {
      this.campos = campos;
    });

    this.tipoDocumentoSubscription = this.tipoDocumentoService
      .listarTipoDocumento()
      .subscribe((tipoDocumento: TipoDocumentoModel[]) => {
        this.tipoDocumentos = tipoDocumento;
      });

    this.vacunaSubscription = this.vacunaService.listarVacunas().subscribe((vacuna: VacunaModel[]) => {
      this.vacunas = vacuna;
    });

    this.generoSubscription = this.generoService.listarGenero().subscribe((genero: GeneroModel[]) => {
      this.generos = genero;
    });
  }

  get registroUno() {
    return this.registroUnoFormGroup.controls;
  }
  get registroDos() {
    return this.registroDosFormGroup.controls;
  }
  get registroTres() {
    return this.registroTresFormGroup.controls;
  }

  ngOnDestroy(): void {
    this.congregacionSubscription.unsubscribe();
    this.campoSubscription.unsubscribe();
    this.tipoDocumentoSubscription.unsubscribe();
    this.vacunaSubscription.unsubscribe();
    this.generoSubscription.unsubscribe();
  }

  listarCampos(congregacion: string) {
    this.camposFiltrados = this.campos.filter((campoBuscar) => campoBuscar.id_congregacion === parseInt(congregacion));
  }

  next() {
    if (this.step == 1) {
      this.registroUno_step = true;
      if (this.registroUnoFormGroup.invalid) {
        return;
      }
      this.step++;
      return;
    }
    if (this.step == 2) {
      this.registroDos_step = true;
      if (this.registroDosFormGroup.invalid) {
        return;
      }
      this.step++;
    }
  }

  previous() {
    this.step--;
    if (this.step == 1) {
      this.registroUno_step = false;
    }
    if (this.step == 2) {
      this.registroDos_step = false;
    }
  }

  submit() {
    if (this.step == 3) {
      this.registroTres_step = true;

      if (
        this.registroUnoFormGroup.invalid ||
        this.registroDosFormGroup.invalid ||
        this.registroTresFormGroup.invalid
      ) {
        return;
      } else if (
        !!this.registroUnoFormGroup.valid &&
        !!this.registroDosFormGroup.valid &&
        !!this.registroTresFormGroup.valid &&
        !!this.registroTresFormGroup.get('terminos').value
      ) {
        this.formSubmitted = true;
        let informacionFormulario = Object.assign(
          this.registroUnoFormGroup.value,
          this.registroDosFormGroup.value,
          this.registroTresFormGroup.value
        );

        if (this.usuarioSeleccionado) {
          // Actualiza si existe el usuario
          this.usuarioService.actualizarUsuario(this.usuarioSeleccionado, this.usuarioSeleccionado.id).subscribe(
            (usuarioActualizado: any) => {
              Swal.fire(
                'Usuario Actualizado',
                `${usuarioActualizado.usuarioActualizado.primer_nombre} ${usuarioActualizado.usuarioActualizado.primer_apellido} actualizado correctamente`,
                'success'
              );
            },
            (err) => {
              // Si sucede un error
              Swal.fire('Error', err.error.msg, 'error');
            }
          );
        } else {
          // Crea el Usuario nuevo

          this.usuarioService.crearUsuario(informacionFormulario).subscribe(
            (respuestaUsuario) => {
              Swal.fire('Usuario', 'Se registró el usuario en la plataforma', 'success');

              this.usuario = respuestaUsuario.usuario;
              this.idUsuario = respuestaUsuario.usuario.id;
              this.usuarioRegistrado = true;
              this.subirCarnet = true;
              this.mostrarElCarnet(this.idUsuario);
            },
            (err) => {
              // Si sucede un error
              Swal.fire('Error', err.error.msg, 'error');
            }
          );

          if (this.registroTres.invalid) {
            return;
          }
        }
      }

      this.reseteaFormularios();
      this.existeUsuario = false;
    }
  }

  mostrarElCarnet(id: string) {
    return this.usuarios.find((usuario) => usuario.id.toString() === id.toString())?.carnetUrl;
  }

  reseteaFormularios() {
    this.registroUnoFormGroup.reset();
    this.registroDosFormGroup.reset();
    this.registroTresFormGroup.reset();
    this.step = 1;
  }

  buscarUsuario(termino: string) {
    if (termino.length === 0) {
      // this.existeUsuario = false;
    } else {
      this.busquedasService.buscarUsuario(termino).subscribe(
        (usuarios: any) => {
          this.usuarios = usuarios;

          if (this.usuarios.length > 0) {
            Swal.fire({
              icon: 'info',
              title: 'Usuario Registrado',
              html: 'Actualice sus datos',
              showConfirmButton: false,
              timer: 1000,
            });
            this.actualizaUsuario(this.usuarios[0]);
          } else {
            // Si el usuario no esta registrado
            Swal.fire({
              icon: 'info',
              html: 'Inicie el proceso de registro',
              showConfirmButton: false,
              timer: 1000,
            });
            this.existeUsuario = true;
          }
          this.registroUnoFormGroup.get('numero_documento').setValue(termino);
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            html: err.msg,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
    }
  }

  actualizaUsuario(usuario: UsuarioModel) {
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
      id_vacuna,
      imagen,
      id_congregacion,
    } = usuario;
    this.usuarioSeleccionado = usuario;

    this.registroUnoFormGroup.setValue({
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      id_tipoDocumento,
      numero_documento,
    });

    this.registroDosFormGroup.setValue({
      fecha_nacimiento,
      email,
      celular,
      id_genero,
    });

    this.registroTresFormGroup.setValue({
      id_vacuna,
      id_congregacion,
      campo: '',
      terminos: true,
    });

    this.existeUsuario = true;
  }
}
