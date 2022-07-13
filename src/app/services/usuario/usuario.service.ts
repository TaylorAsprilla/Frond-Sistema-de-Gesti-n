import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ListarUsuario } from 'src/app/interfaces/listar-usuario.interface';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { RegisterForm } from 'src/app/interfaces/register-form.interface';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';
import { PermisosService } from '../permisos/permisos.service';
import { PermisoEnum } from '../sidebar/sidebar.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario: UsuarioModel;

  constructor(private httpClient: HttpClient, private router: Router, private permisosServices: PermisosService) {}

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

  get usuarioLogin() {
    return localStorage.getItem('idUsuario') || '';
  }

  get existeUsuario() {
    return this.usuario;
  }

  validarToken(): Observable<boolean> {
    return this.httpClient
      .get(`${base_url}/login/renew/`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((respuesta: any) => {
          const {
            id,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            numero_documento,
            email,
            celular,
            fecha_nacimiento,
            estado,
            documentoTutor,
            id_congregacion,
            id_tipoDocumento,
            id_genero,
            id_vacuna,
            id_dosis,
            login,
            password,
            carnet,
            imagen = '',
          } = respuesta.usuario;

          this.usuario = new UsuarioModel(
            id,
            primer_nombre,
            primer_apellido,
            numero_documento,
            fecha_nacimiento,
            id_congregacion,
            id_tipoDocumento,
            id_genero,
            estado,
            documentoTutor,
            id_vacuna,
            id_dosis,
            login,
            password,
            segundo_nombre,
            segundo_apellido,
            celular,
            email,
            1,
            carnet,
            imagen
          );
          localStorage.setItem('token', respuesta.token);
          return true;
        }),

        catchError((error) => {
          this.router.navigateByUrl('/login');
          console.log(error);
          return of(false);
        })
      );
  }

  login(formData: LoginForm) {
    return this.httpClient.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('idUsuario', resp.usuario.id);
        localStorage.setItem('primer_nombre', resp.usuario.primer_nombre);
        localStorage.setItem('segundo_nombre', resp.usuario.segundo_nombre);
        localStorage.setItem('primer_apellido', resp.usuario.primer_apellido);
        localStorage.setItem('segundo_apellido', resp.usuario.segundo_apellido);
        localStorage.setItem('email', resp.usuario.email);
        localStorage.setItem('Número de documento', resp.usuario.numero_documento);
        localStorage.setItem('imagen', resp.usuario.imagen);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('primer_nombre');
    localStorage.removeItem('segundo_nombre');
    localStorage.removeItem('primer_apellido');
    localStorage.removeItem('segundo_apellido');
    localStorage.removeItem('email');
    localStorage.removeItem('Número de documento');
    localStorage.removeItem('imagen');
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  crearUsuario(formData: RegisterForm) {
    return this.httpClient.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        resp;
      })
    );
  }

  listarUsuarios(desde: number = 0) {
    return this.httpClient.get<ListarUsuario>(`${base_url}/usuarios?desde=${desde}`, this.headers).pipe(
      map((usuariosRespuesta) => {
        const usuarios = usuariosRespuesta.usuarios.map(
          (usuario) =>
            new UsuarioModel(
              usuario.id,
              usuario.primer_nombre,
              usuario.primer_apellido,
              usuario.numero_documento,
              usuario.fecha_nacimiento,
              usuario.id_congregacion,
              usuario.id_tipoDocumento,
              usuario.id_genero,
              usuario.estado,
              usuario.documentoTutor,
              usuario.id_vacuna,
              usuario.id_dosis,
              usuario.login,
              usuario.password,
              usuario.segundo_nombre,
              usuario.segundo_apellido,
              usuario.celular,
              usuario.email,
              usuario.vacuna,
              usuario.carnet,
              usuario.imagen
            )
        );
        return { totalUsuarios: usuariosRespuesta.totalUsuarios, usuarios };
      })
    );
  }

  listarTodosLosUsuarios() {
    return this.httpClient.get<ListarUsuario>(`${base_url}/usuarios/todos`, this.headers).pipe(
      map((usuariosRespuesta) => {
        const usuarios = usuariosRespuesta.usuarios.map(
          (usuario) =>
            new UsuarioModel(
              usuario.id,
              usuario.primer_nombre,
              usuario.primer_apellido,
              usuario.numero_documento,
              usuario.fecha_nacimiento,
              usuario.id_congregacion,
              usuario.id_tipoDocumento,
              usuario.id_genero,
              usuario.estado,
              usuario.documentoTutor,
              usuario.id_vacuna,
              usuario.id_dosis,
              usuario.login,
              usuario.password,
              usuario.segundo_nombre,
              usuario.segundo_apellido,
              usuario.celular,
              usuario.email,
              usuario.vacuna,
              usuario.carnet,
              usuario.imagen
            )
        );
        return { totalUsuarios: usuariosRespuesta.totalUsuarios, usuarios };
      })
    );
  }

  getUsuario(id: string) {
    return this.httpClient
      .get(`${base_url}/usuarios/${id}`, this.headers)
      .pipe(map((usuario: { ok: boolean; usuario: UsuarioModel }) => usuario.usuario));
  }

  eliminarUsuario(usuario: UsuarioModel) {
    return this.httpClient.delete(`${base_url}/usuarios/${usuario.id}`, this.headers);
  }

  actualizarUsuario(usuario: UsuarioModel, id: string) {
    return this.httpClient.put(`${base_url}/usuarios/${id}`, usuario, this.headers);
  }
}
