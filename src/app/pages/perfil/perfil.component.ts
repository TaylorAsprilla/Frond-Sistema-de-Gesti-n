import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CampoModel } from 'src/app/models/campo.model';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { DosisModel } from 'src/app/models/dosis.model';
import { GeneroModel } from 'src/app/models/genero.model';
import { TipoDocumentoModel } from 'src/app/models/tipo-documento.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { VacunaModel } from 'src/app/models/vacuna.model';
import { CampoService } from 'src/app/services/campo/campo.service';
import { CongregacionService } from 'src/app/services/congregacion/congregacion.service';
import { DosisService } from 'src/app/services/dosis/dosis.service';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { GeneroService } from 'src/app/services/genero/genero.service';
import { MinisterioService } from 'src/app/services/ministerio/ministerio.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento/tipo-documento.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { VacunaService } from 'src/app/services/vacuna/vacuna.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit, OnDestroy {
  public perfilForm: FormGroup;
  public usuario: UsuarioModel;
  public imagenSubir: File;
  public imagenTemporal: string | ArrayBuffer;

  public totalUsuarios: number = 0;
  public usuarios: UsuarioModel[] = [];
  public congregaciones: CongregacionModel[] = [];
  public campos: CampoModel[] = [];
  public tipoDocumentos: TipoDocumentoModel[] = [];
  public vacunas: VacunaModel[] = [];
  public dosis: DosisModel[] = [];
  public generos: GeneroModel[] = [];

  public camposFiltrados: CampoModel[] = [];

  public congregacionSubscription: Subscription;
  public campoSubscription: Subscription;
  public tipoDocumentoSubscription: Subscription;
  public usuarioSubscription: Subscription;
  public generoSubscription: Subscription;
  public vacunaSubscription: Subscription;
  public dosisSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService,
    public congregacionService: CongregacionService,
    public campoService: CampoService,
    public ministerioService: MinisterioService,
    public tipoDocumentoService: TipoDocumentoService,
    private generoService: GeneroService,
    private vacunaService: VacunaService,
    private dosisService: DosisService
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
      fecha_nacimiento: [this.usuario.fecha_nacimiento, []],
      email: [this.usuario.email, [Validators.email]],
      celular: [this.usuario.celular, [Validators.minLength(3)]],
      id_genero: [this.usuario.id_genero, [Validators.required]],
      id_vacuna: [this.usuario.vacuna, [Validators.required]],
      id_dosis: [this.usuario.id_dosis, [Validators.required]],
      imagen: [this.usuario.imagenUrl, []],
      id_congregacion: [this.usuario.id_congregacion, [Validators.required]],
      login: [this.usuario.login, []],
      password: ['', []],
    });

    this.congregacionSubscription = this.congregacionService
      .listarCongregaciones()
      .subscribe((congregaciones: CongregacionModel[]) => {
        this.congregaciones = congregaciones;
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

    this.dosisSubscription = this.dosisService.listarDosis().subscribe((dosis: DosisModel[]) => {
      this.dosis = dosis.filter((dosis) => dosis.estado === true);
    });

    this.generoSubscription = this.generoService.listarGenero().subscribe((genero: GeneroModel[]) => {
      this.generos = genero;
    });
  }

  ngOnDestroy(): void {
    this.tipoDocumentoSubscription?.unsubscribe();
    this.campoSubscription?.unsubscribe();
    this.congregacionSubscription?.unsubscribe();
    this.usuarioSubscription?.unsubscribe();
    this.dosisSubscription?.unsubscribe();
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
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.id).then((imagenNueva) => {
      if (imagenNueva) {
        this.usuario.imagen = imagenNueva;
        Swal.fire('Imagen Actualizada', 'Imagen de usuario actualizada', 'success');
      } else {
        Swal.fire('Imagen', 'No se pudo subir la imagen', 'error');
      }
    });
  }

  listarCampos(congregacion: string) {
    this.camposFiltrados = this.campos.filter((campoBuscar) => campoBuscar.id_congregacion === parseInt(congregacion));
  }
}
