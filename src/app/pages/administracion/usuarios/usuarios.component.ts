import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: UsuarioModel[] = [];
  public usuariosTemporales: UsuarioModel[] = [];
  public paginaDesde: number = 0;
  public cargando: boolean = true;
  public imagenSusbcription: Subscription;
  public placeholder: string = 'Buscar usuarios';

  constructor(
    private usuarioServices: UsuarioService,
    private busquedasService: BusquedasService,
    public modalImagenServices: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imagenSusbcription = this.modalImagenServices.nuevaImagen.subscribe((nuevaimagen) => {
      this.cargarUsuarios();
    });
  }

  ngOnDestroy(): void {
    this.imagenSusbcription.unsubscribe();
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
}
