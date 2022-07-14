import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PermisoUsuarioModel } from 'src/app/models/permiso-usuario.model';

@Directive({
  selector: '[appPermisos]',
})
export class PermisosDirective implements OnInit {
  private permisoUsuario: PermisoUsuarioModel[];
  private permisos = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {}

  @Input()
  set appPermisos(val: Array<string>) {
    this.activatedRoute.data.subscribe((data) => {
      this.permisoUsuario = data.permisos;
    });

    this.permisos = val;
    this.actualizarVista();
  }

  private actualizarVista(): void {
    this.viewContainer.clear();
    if (this.validarPermisos()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private validarPermisos(): boolean {
    let tienePermiso = false;

    if (this.permisoUsuario) {
      for (const permiso of this.permisos) {
        const permisosUsuario = this.permisoUsuario.find(
          (permiso) => permiso.nombre.toUpperCase() === this.permisos.toString()
        );

        if (permisosUsuario) {
          tienePermiso = true;
          break;
        }
      }
    }
    return tienePermiso;
  }
}
