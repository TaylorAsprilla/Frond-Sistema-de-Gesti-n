import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class InicioComponent implements OnInit, OnDestroy, OnChanges {
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

  totalTodosLosUsuarios: number;
  totalUsuarios: number;
  titulo: string;
  placeholderBuscador: string;

  existeUsuario: boolean = false;

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
        console.log('Ministerios', this.ministerios);
      });

    this.ingresoSubscription = this.ingresoService.getIngresos().subscribe((ingresos: IngresoModel[]) => {
      this.ingresos = ingresos;
      console.log('Ingresos', this.ingresos);
    });

    this.contarUsuarioEnCongregacion();
  }

  ngOnDestroy(): void {
    this.usuariosSubscription?.unsubscribe();
    this.congregacionesSubscription?.unsubscribe();
    this.camposSubscription?.unsubscribe();
    this.ministeriosSubscription?.unsubscribe();
    this.todosLosusuariosSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Cahnges', changes);
    // if (changes.busquedaUsuario) {
    //   if (
    //     (changes.busquedaUsuario.currentValue[0]?.id_vacuna === 4 ||
    //       changes.busquedaUsuario.currentValue[0]?.id_dosis >= 2) &&
    //     !!changes.busquedaUsuario.currentValue[0]?.carnet
    //   ) {
    //     this.ingreso = true;
    //   } else {
    //     this.ingreso = false;
    //   }
    // }
  }

  buscarUsuario(termino: string) {
    if (termino.length === 0) {
      this.existeUsuario = false;
    } else {
      this.busquedasService.buscarUsuario(termino).subscribe((usuarios: any) => {
        this.usuarios = usuarios;
        this.existeUsuario = true;
      });
    }
  }

  volverAlRegistro() {
    this.router.navigateByUrl(`/registro`);
  }

  ingresoUsuario(event) {
    this.existeUsuario = false;
  }

  contarUsuarioEnCongregacion() {
    const idcongregacion = sessionStorage.getItem('congregacion_ingreso');
    // console.log('Id de la congregación', idcongregacion);
    return this.todosLosUsuarios.filter((usuario) => {
      // console.log('usuarios', usuario);
      usuario.id_congregacion.toString() === idcongregacion;
    }).length;
  }
}
