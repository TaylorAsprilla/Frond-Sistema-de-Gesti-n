import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { PermisosService } from './permisos.service';

@Injectable({
  providedIn: 'root',
})
export class PermisosResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private permisosServices: PermisosService,
    private usuarioService: UsuarioService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let usuario = this.usuarioService.usuario;

    return this.permisosServices.getPermisosUsuario(usuario.id).pipe(
      catchError((error) => {
        this.router.navigateByUrl('/login');
        return of('No data');
      })
    );
  }
}
