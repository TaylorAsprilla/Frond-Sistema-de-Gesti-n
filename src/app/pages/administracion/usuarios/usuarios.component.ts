import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CampoModel } from 'src/app/models/campo.model';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { TipoDocumentoModel } from 'src/app/models/tipo-documento.model';
import { Nombre, UsuarioModel } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas/busquedas.service';
import { CampoService } from 'src/app/services/campo/campo.service';
import { CongregacionService } from 'src/app/services/congregacion/congregacion.service';
import { MinisterioService } from 'src/app/services/ministerio/ministerio.service';
import { ModalImagenService } from 'src/app/services/modal-imagen/modal-imagen.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento/tipo-documento.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  get Nombre() {
    return Nombre;
  }

  public totalUsuarios: number = 0;
  public usuarios: UsuarioModel[] = [];

  public usuariosTemporales: UsuarioModel[] = [];
  public congregaciones: CongregacionModel[] = [];
  public campos: CampoModel[] = [];
  public tipoDocumentos: TipoDocumentoModel[] = [];

  public paginaDesde: number = 0;

  public congregacion: any;
  public campo: string;
  public documento: string;
  public ministerio: string;

  public cargando: boolean = true;
  public placeholder: string = 'Buscar usuarios';

  public imagenSusbcription: Subscription;
  public congregacionSubscription: Subscription;
  public campoSubscription: Subscription;
  public tipoDocumentoSubscription: Subscription;
  public usuarioSubscription: Subscription;

  constructor(
    private usuarioServices: UsuarioService,
    private busquedasService: BusquedasService,
    public modalImagenServices: ModalImagenService,
    public congregacionServices: CongregacionService,
    public campoServices: CampoService,
    public ministerioServices: MinisterioService,
    public tipoDocumentoService: TipoDocumentoService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imagenSusbcription = this.modalImagenServices.nuevaImagen.subscribe((nuevaimagen) => {
      this.cargarUsuarios();
    });

    this.congregacionSubscription = this.congregacionServices
      .listarCongregaciones()
      .subscribe((congregaciones: CongregacionModel[]) => {
        this.congregaciones = congregaciones;
      });

    this.campoSubscription = this.campoServices.listarCampos().subscribe((campos: CampoModel[]) => {
      this.campos = campos;
    });

    this.tipoDocumentoSubscription = this.tipoDocumentoService
      .listarTipoDocumento()
      .subscribe((tipoDocumento: TipoDocumentoModel[]) => {
        this.tipoDocumentos = tipoDocumento;
      });
  }

  ngOnDestroy(): void {
    this.imagenSusbcription?.unsubscribe();
    this.tipoDocumentoSubscription?.unsubscribe();
    this.campoSubscription?.unsubscribe();
    this.congregacionSubscription?.unsubscribe();
    this.usuarioSubscription?.unsubscribe();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioServices.listarUsuarios(this.paginaDesde).subscribe(({ totalUsuarios, usuarios }) => {
      this.totalUsuarios = totalUsuarios;
      this.usuarios = usuarios;
      this.usuariosTemporales = usuarios;
      this.cargando = false;
    });
  }

  cambiarPagina(valor: number) {
    this.paginaDesde += valor;

    if (this.paginaDesde < 0) {
      this.paginaDesde = 0;
    } else if (this.paginaDesde >= this.totalUsuarios) {
      this.paginaDesde -= valor;
    }
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length === 0) {
      this.usuarios = this.usuariosTemporales;
    } else {
      this.busquedasService.buscarUsuario(termino).subscribe((usuarios: any) => {
        this.usuarios = usuarios;
      });
    }
  }

  borrarUsuario(usuario: UsuarioModel) {
    if (usuario.id === this.usuarioServices.usuarioId) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }
    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta seguro de borrar a ${usuario.primer_nombre} ${usuario.primer_apellido}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioServices.eliminarUsuario(usuario).subscribe((usuarioEliminado) => {
          Swal.fire(
            '¡Deshabilitado!',
            `${usuario.primer_nombre} ${usuario.primer_apellido} fue deshabilitado correctamente`,
            'success'
          );

          this.cargarUsuarios();
        });
      }
    });
  }

  cambiarImagen(usuario: UsuarioModel) {
    this.modalImagenServices.abrirModal(usuario.id, 'usuarios', usuario.imagen);
  }

  buscarNombre(id: string, tipo: string) {
    if (tipo == Nombre.CONGREGACION) {
      this.congregacion = this.congregaciones.find((congregacion) => congregacion.id === id);
      return this.congregacion.nombre;
    } else if (tipo == Nombre.TIPODOCUMENTO) {
      const tipoDocumento = this.tipoDocumentos.find((tipoDocumento) => tipoDocumento.id === parseInt(id));
      return tipoDocumento.nombre;
    }
  }
}
