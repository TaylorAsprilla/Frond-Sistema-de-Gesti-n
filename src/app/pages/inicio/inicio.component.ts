import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CampoModel } from 'src/app/models/campo.model';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { IngresoModel } from 'src/app/models/ingreso.model';
import { MinisterioModel } from 'src/app/models/ministerio.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas/busquedas.service';
import { CampoService } from 'src/app/services/campo/campo.service';
import { CongregacionService } from 'src/app/services/congregacion/congregacion.service';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { MinisterioService } from 'src/app/services/ministerio/ministerio.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit, OnDestroy {
  usuariosSubscription: Subscription;
  camposSubscription: Subscription;
  congregacionesSubscription: Subscription;
  ministeriosSubscription: Subscription;
  todosLosusuariosSubscription: Subscription;
  ingresoSubscription: Subscription;

  congregaciones: CongregacionModel[] = [];
  campos: CampoModel[] = [];
  ministerios: MinisterioModel[] = [];
  usuarios: UsuarioModel[] = [];
  todosLosUsuarios: UsuarioModel[] = [];
  ingresos: IngresoModel[] = [];

  congregacionIngreso: CongregacionModel;
  totalTodosLosUsuarios: number;
  totalUsuarios: number;
  totalIngresos: number = 0;
  congregacionQueIngresa: any;
  usuarioEncontrado: UsuarioModel[] = [];

  titulo: string;
  placeholderBuscador: string;

  existeUsuario: boolean = false;
  iniciarIngreso: boolean = false;
  fecha = new Date().toLocaleDateString('en-CA');

  constructor(
    private usuarioServices: UsuarioService,
    private congregacionServices: CongregacionService,
    private campoServices: CampoService,
    private ministerioService: MinisterioService,
    private busquedasService: BusquedasService,
    private ingresoService: IngresoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titulo = 'Buscar usuarios vacunados';
    this.placeholderBuscador = 'Ingrese el número de documento';
    this.totalIngresos = 0;

    // Los usuarios paginados
    this.usuariosSubscription = this.usuarioServices.listarUsuarios().subscribe(({ totalUsuarios, usuarios }) => {
      this.totalUsuarios = totalUsuarios;
      this.usuarios = usuarios;
    });

    // Todos los usuarios
    this.todosLosusuariosSubscription = this.usuarioServices
      .listarTodosLosUsuarios()
      .subscribe(({ totalUsuarios, usuarios }) => {
        this.todosLosUsuarios = usuarios.filter((usuario) => usuario.estado === true);
        this.totalTodosLosUsuarios = this.todosLosUsuarios.length;
      });

    this.congregacionesSubscription = this.congregacionServices
      .listarCongregaciones()
      .subscribe((congregaciones: CongregacionModel[]) => {
        this.congregaciones = congregaciones;
      });

    this.camposSubscription = this.campoServices.listarCampos().subscribe((campos: CampoModel[]) => {
      this.campos = campos;
    });

    this.ministeriosSubscription = this.ministerioService
      .listarMinisterios()
      .subscribe((ministerios: MinisterioModel[]) => {
        this.ministerios = ministerios;
      });

    this.contarUsuarioEnCongregacion();
  }

  ngOnDestroy(): void {
    this.usuariosSubscription?.unsubscribe();
    this.congregacionesSubscription?.unsubscribe();
    this.camposSubscription?.unsubscribe();
    this.ministeriosSubscription?.unsubscribe();
    this.todosLosusuariosSubscription?.unsubscribe();
    this.ingresoSubscription?.unsubscribe();
  }

  buscarUsuario(termino: string) {
    if (termino.length === 0) {
      this.existeUsuario = false;
    } else {
      this.busquedasService.buscarUsuario(termino).subscribe((usuarios: any) => {
        this.usuarioEncontrado = usuarios;
        this.existeUsuario = true;
      });
    }
  }

  buscarCongregacion() {
    let idCongregacionIngreso = localStorage.getItem('congregacion_ingreso');
    this.congregacionServices.getCongregacion(idCongregacionIngreso).subscribe((congregacion: CongregacionModel) => {
      this.congregacionIngreso = congregacion;
    });
  }

  volverAlRegistro() {
    this.router.navigateByUrl(`/registro`);
  }

  ingresoUsuario(idUsuario: string = null) {
    this.existeUsuario = false;
    if (idUsuario) {
      this.contarUsuarioEnCongregacion();
    }
  }

  obtenerNombreCongregacion(nombreCongregacion: string) {
    if (nombreCongregacion) {
      this.congregacionQueIngresa = nombreCongregacion;
      this.iniciarIngreso = true;
    }
  }

  contarUsuarioEnCongregacion() {
    const idcongregacion = localStorage.getItem('congregacion_ingreso');

    if (!!idcongregacion) {
      this.ingresoSubscription = this.ingresoService
        .getIngresos()
        .pipe(delay(100))
        .subscribe((ingreso: IngresoModel[]) => {
          this.ingresos = ingreso.filter(
            (ingreso) =>
              ingreso.id_congregacion === parseInt(idcongregacion) && ingreso.fecha_ingreso === this.fecha.toString()
          );

          this.totalIngresos = this.ingresos.length;
        });
    }
  }
}
