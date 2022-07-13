import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class TokenResolver implements Resolve<any> {
  constructor(private router: Router, private usuarioService: UsuarioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    throw this.usuarioService.validarToken().pipe(
      catchError((error) => {
        this.router.navigateByUrl('/login');
        return of('No data');
      })
    );
  }
}
