import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TipoDocumentoModel } from 'src/app/models/tipo-documento.model';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
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

  listarTipoDocumento() {
    return this.httpClient
      .get(`${base_url}/tipodocumento`, this.headers)
      .pipe(map((tipoDocumento: { ok: boolean; tipoDocumento: TipoDocumentoModel[] }) => tipoDocumento.tipoDocumento));
  }

  crearCampo(tipoDocumento: TipoDocumentoModel) {
    return this.httpClient.post(`${base_url}/tipodocumento`, tipoDocumento, this.headers);
  }

  actualizarCampo(tipoDocumento: TipoDocumentoModel) {
    return this.httpClient.put(`${base_url}/tipodocumento/${tipoDocumento.id}`, tipoDocumento, this.headers);
  }

  elimiminarMinisterio(tipoDocumento: TipoDocumentoModel) {
    return this.httpClient.delete(`${base_url}/tipodocumento/${tipoDocumento.id}`, this.headers);
  }
}
