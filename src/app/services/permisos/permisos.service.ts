import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PermisoUsuarioModel } from 'src/app/models/permiso-usuario.model';
import { PermisoModel } from 'src/app/models/permiso.model';
import { environment } from 'src/environments/environment';
import { PermisoEnum } from '../sidebar/sidebar.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class PermisosService {
  constructor(private httpClient: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  // get permisoUsuario() {
  //   const idUsuario = localStorage.getItem('idUsuario');
  //   return this.getPermisosUsuario(idUsuario).subscribe();
  // }

  tienePermisos(idUsuario: string, permisos: PermisoEnum[]) {
    return idUsuario && permisos.includes;
  }

  getPermisos() {
    return this.httpClient
      .get(`${base_url}/permisos`, this.headers)
      .pipe(map((permiso: { ok: boolean; permiso: PermisoModel[] }) => permiso.permiso));
  }

  getPermisosUsuario(idUsuario: string) {
    return this.httpClient
      .get(`${base_url}/permisos/usuario/${idUsuario}`, this.headers)
      .pipe(map((permisos: { ok: boolean; permisos: PermisoUsuarioModel[] }) => permisos.permisos));
  }
}
