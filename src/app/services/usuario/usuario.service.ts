import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { RegisterForm } from 'src/app/interfaces/register-form.interface';
import { UsuarioInterface } from 'src/app/interfaces/usuario.interface';
import { UsuarioModel } from 'src/app/models/usuario.model';

import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario: UsuarioModel;
  public idUsuario: number;

  constructor(private httpClient: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get usuarioId(): string {
    return this.usuario.id || '';
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
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
            id_congregacion,
            id_tipoDocumento,
            id_genero,
            id_vacuna,
            login,
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
            login,
            '',
            segundo_nombre,
            segundo_apellido,
            celular,
            email,
            id_vacuna,
            imagen
          );
          localStorage.setItem('token', respuesta.token);
          return true;
        }),

        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.httpClient.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  login(formData: LoginForm) {
    return this.httpClient.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        this.idUsuario = resp.usuario.id;
      })
    );
  }

  listarUsuarios() {
    return this.httpClient.get(`${base_url}/usuarios`);
  }

  getUsuario(id: string) {
    return this.httpClient.get(`${base_url}/usuarios${id}`);
  }

  eliminarUsuario(id: string) {
    return this.httpClient.delete(`${base_url}/usuarios${id}`);
  }

  actualizarUsuario(usuarioActualizado: UsuarioInterface) {
    return this.httpClient.put(`${base_url}/usuarios/${this.usuarioId}`, usuarioActualizado, {
      headers: {
        'x-token': this.token,
      },
    });
  }
}
