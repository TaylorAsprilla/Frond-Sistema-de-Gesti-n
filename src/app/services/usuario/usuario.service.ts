import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { UsuarioInterface } from 'src/app/interfaces/usuario.interface';
import { UsuarioModel } from 'src/app/models/usuario.model';

import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public usuario: UsuarioModel;

  constructor(private httpClient: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  googleInit() {
    return new Promise<void>((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '659520052183-7up5bpa0oc64p06a8hpmps1difupahbh.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }

  logout() {
    sessionStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean> {
    const token = sessionStorage.getItem('token') || '';

    return this.httpClient
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((resp: any) => {
          const {
            primerNombre,
            primerApellido,
            numeroDocumento,
            fechaNacimiento,
            congregacion,
            tipoDocumento,
            genero,
            login,
            clave,
            segundoNombre,
            segundoApellido,
            celular,
            email,
            imagen,
          } = resp.usuario;

          this.usuario = new UsuarioModel(
            primerNombre,
            primerApellido,
            numeroDocumento,
            fechaNacimiento,
            congregacion,
            tipoDocumento,
            genero,
            login,
            clave,
            segundoNombre,
            segundoApellido,
            celular,
            email,
            imagen
          );

          sessionStorage.setItem('token', resp.token);
          return true;
        }),

        catchError((error) => of(false))
      );
  }

  // crearUsuario(formData: RegisterForm) {
  //   return this.httpClient.post(`${base_url}/usuarios`, formData).pipe(
  //     tap((resp: any) => {
  //       sessionStorage.setItem('token', resp.token);
  //     })
  //   );
  // }

  login(formData: LoginForm) {
    return this.httpClient.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        sessionStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token) {
    console.log(token);
    return this.httpClient.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        sessionStorage.setItem('token', resp.token);
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

  actualizarUsuario(id: string, usuarioActualizado: UsuarioModel) {
    return this.httpClient.put(`${base_url}/usuarios${id}`, usuarioActualizado);
  }

  crearUsuario(usuario: UsuarioInterface) {
    return this.httpClient.post(`${base_url}/usuarios`, usuario);
  }
}
