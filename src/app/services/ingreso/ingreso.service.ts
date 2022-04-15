import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IngresoModel } from 'src/app/models/ingreso.model';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class IngresoService {
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

  crearIngreso(idVulunatrio: string, idUsuario: string) {
    return this.httpClient.post(
      `${base_url}/ingreso`,
      { id_daIngreso: idVulunatrio, id_usuario: idUsuario },
      this.headers
    );
  }
}
