import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CampoModel } from 'src/app/models/campo.model';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { GeneroModel } from 'src/app/models/genero.model';
import { TipoDocumentoModel } from 'src/app/models/tipo-documento.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { VacunaModel } from 'src/app/models/vacuna.model';
import { CampoService } from 'src/app/services/campo/campo.service';
import { CongregacionService } from 'src/app/services/congregacion/congregacion.service';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { GeneroService } from 'src/app/services/genero/genero.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento/tipo-documento.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { VacunaService } from 'src/app/services/vacuna/vacuna.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mantenimiento-usuarios',
  templateUrl: './mantenimiento-usuarios.component.html',
  styleUrls: ['./mantenimiento-usuarios.component.css'],
})
export class MantenimientoUsuariosComponent implements OnInit, OnDestroy {
  public usuarioForm: FormGroup;

  public usuarios: UsuarioModel[] = [];
  public usuarioSeleccionado: UsuarioModel;
  public congregaciones: CongregacionModel[] = [];
  public tipoDocumentos: TipoDocumentoModel[] = [];
  public vacunas: VacunaModel[] = [];
  public generos: GeneroModel[] = [];
  public campos: CampoModel[] = [];
  public camposFiltrados: CampoModel[] = [];

  public usuario: UsuarioModel;
  public congregacionSeleccionada: CongregacionModel;
  public tipoDocumentoSeleccionado: TipoDocumentoModel;
  public vacunaSeleccionada: VacunaModel;
  public generoSeleccionado: GeneroModel;
  public campoSeleccionado: CampoModel;

  public imagenUsuario: any;
  public idUsuario: string;

  public imagenSubir: File;
  public imagenTemporal: string | ArrayBuffer;

  public usuarioSubscription: Subscription;
  public congregacionSubscription: Subscription;
  public tipoDocumentoSubscription: Subscription;
  public vacunaSubscription: Subscription;
  public generoSubscription: Subscription;
  public campoSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private campoServices: CampoService,
    private congregacionServices: CongregacionService,
    private tipoDocumentoService: TipoDocumentoService,
    private vacunaService: VacunaService,
    private generoService: GeneroService,
    private campoService: CampoService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.usuarioSubscription = this.usuarioService.listarTodosLosUsuarios().subscribe(({ totalUsuarios, usuarios }) => {
      this.usuarios = usuarios;

      if (this.usuarios.length > 0) {
        this.activateRouter.params.subscribe(({ id }) => {
          this.idUsuario = id;
          this.crearUsuario(this.idUsuario);
        });
      }
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
      id_campo: ['', []],
    });

    this.congregacionSubscription = this.congregacionServices
      .listarCongregaciones()
      .subscribe((congregaciones: CongregacionModel[]) => {
        this.congregaciones = congregaciones;
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

    this.campoSubscription = this.campoService.listarCampos().subscribe((campos: CampoModel[]) => {
      this.campos = campos;
    });

    this.informacionSelec();
  }
  ngOnDestroy(): void {
    this.congregacionSubscription?.unsubscribe();
    this.vacunaSubscription?.unsubscribe();
    this.tipoDocumentoSubscription?.unsubscribe();
    this.generoSubscription?.unsubscribe();
  }

  informacionSelec() {
    this.usuarioForm.get('id_congregacion').valueChanges.subscribe((idCongregacion) => {
      this.congregacionSeleccionada = this.congregaciones.find(
        (congregacion) => congregacion.id.toString() === idCongregacion.toString()
      );
    });

    this.usuarioForm.get('id_tipoDocumento').valueChanges.subscribe((idTipoDocumento) => {
      this.tipoDocumentoSeleccionado = this.tipoDocumentos.find(
        (tipoDocumento) => tipoDocumento.id.toString() === idTipoDocumento.toString()
      );
    });

    this.usuarioForm.get('id_genero').valueChanges.subscribe((idGenero) => {
      this.generoSeleccionado = this.generos.find((genero) => genero.id.toString() === idGenero.toString());
    });

    this.usuarioForm.get('id_tipoDocumento').valueChanges.subscribe((idTipoDocumento) => {
      this.tipoDocumentoSeleccionado = this.tipoDocumentos.find(
        (tipoDocumento) => tipoDocumento.id.toString() === idTipoDocumento.toString()
      );
    });

    this.usuarioForm.get('id_vacuna').valueChanges.subscribe((idVacuna) => {
      this.vacunaSeleccionada = this.vacunas.find((vacuna) => vacuna.id.toString() === idVacuna.toString());
    });

    this.usuarioForm.get('id_campo').valueChanges.subscribe((idCampo) => {
      this.campoSeleccionado = this.campos.find((campo) => campo.id.toString() === idCampo.toString());
    });
  }

  listarCampos(congregacion: string) {
    this.camposFiltrados = this.campos.filter((campoBuscar) => campoBuscar.id_congregacion === parseInt(congregacion));
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'pdf', 'PDF', 'PNG', 'JPEG', 'JPG'];
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
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'carnets', this.idUsuario).then((imagenNueva) => {
      if (imagenNueva) {
        this.usuario.carnet = imagenNueva;
        Swal.fire('Imagen Actualizada', 'Imagen de usuario actualizada', 'success');
      } else {
        Swal.fire('Imagen', 'No se pudo subir la imagen', 'error');
      }
    });
  }

  guardarUsuario() {
    const usuarioNuevo = this.usuarioForm.value;

    if (this.usuarioSeleccionado) {
      this.usuarioService.actualizarUsuario(usuarioNuevo, this.idUsuario).subscribe((usuarioActualizado: any) => {
        Swal.fire(
          'Usuario Actualizado',
          `${usuarioActualizado.usuarioActualizado.primer_nombre} ${usuarioActualizado.usuarioActualizado.primer_apellido}  actualizado correctamente`,
          'success'
        );
        this.router.navigateByUrl(`/sistema/usuarios`);
      });
    } else {
      this.usuarioService.crearUsuario(usuarioNuevo).subscribe((usuarioCreado: any) => {
        Swal.fire('Usuario creado', 'correctamente`', 'success');
        this.router.navigateByUrl(`/sistema/usuario/${usuarioCreado}`);
      });
    }
  }

  crearUsuario(id: string) {
    if (id !== 'nuevo') {
      this.imagenUsuario = this.usuarios.find((usuario) => usuario.id.toString() === id.toString())?.carnetUrl;

      this.usuarioService.getUsuario(id).subscribe(
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
            id_vacuna,
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
            imagen,
            id_congregacion,
            id_vacuna,
            id_campo: 1,
          });
        },
        (error) => {
          return this.router.navigateByUrl(`/sistema/usuarios`);
        }
      );
    } else {
      return;
    }
  }
}
