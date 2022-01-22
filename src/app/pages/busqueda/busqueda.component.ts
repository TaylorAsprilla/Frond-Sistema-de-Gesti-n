import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampoModel } from 'src/app/models/campo.model';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { MinisterioModel } from 'src/app/models/ministerio.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
})
export class BusquedaComponent implements OnInit {
  public usuarios: UsuarioModel[] = [];
  public congregaciones: CongregacionModel[] = [];
  public campos: CampoModel[] = [];
  public ministerios: MinisterioModel[] = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private busquedasServices: BusquedasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({ termino }) => {
      this.busquedaGlobal(termino);
    });
  }

  busquedaGlobal(termino: string) {
    this.busquedasServices.busquedaGlobal(termino).subscribe((respuesta: any) => {
      console.log(respuesta);
      this.usuarios = respuesta.usuarios;
      this.congregaciones = respuesta.congregaciones;
      this.campos = respuesta.campos;
      this.ministerios = respuesta.ministerios;
    });
  }

  abrirUsuario(usuario: UsuarioModel) {
    this.router.navigateByUrl(`/dashboard/usuario/${usuario.id}`);
  }

  abrirCongregacion(congregacion: CongregacionModel) {
    this.router.navigateByUrl(`/dashboard/congregacion/${congregacion.id}`);
  }

  abrirCampo(campo: CampoModel) {
    this.router.navigateByUrl(`/dashboard/campo/${campo.id}`);
  }

  abrirMinisterio(ministerio: MinisterioModel) {
    this.router.navigateByUrl(`/dashboard/ministerio/${ministerio.id}`);
  }
}
