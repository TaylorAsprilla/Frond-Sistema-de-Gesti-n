import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MinisterioModel } from 'src/app/models/ministerio.model';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MinisterioService {
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

  listarMinisterios() {
    return this.httpClient
      .get(`${base_url}/ministerios`, this.headers)
      .pipe(map((ministerios: { ok: boolean; ministerio: MinisterioModel[] }) => ministerios.ministerio));
  }

  crearMinisterio(ministerio: MinisterioModel) {
    return this.httpClient.post(`${base_url}/ministerios`, ministerio, this.headers);
  }

  actualizarMinisterio(ministerio: MinisterioModel) {
    return this.httpClient.put(`${base_url}/ministerios/${ministerio.id}`, ministerio, this.headers);
  }

  elimiminarMinisterio(ministerio: MinisterioModel) {
    return this.httpClient.delete(`${base_url}/ministerios/${ministerio.id}`, this.headers);
  }
}
