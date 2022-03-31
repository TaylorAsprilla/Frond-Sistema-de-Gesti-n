import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { VacunaModel } from 'src/app/models/vacuna.model';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class VacunaService {
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

  listarVacunas() {
    return this.httpClient
      .get(`${base_url}/vacunas`, this.headers)
      .pipe(map((vacuna: { ok: boolean; vacuna: VacunaModel[] }) => vacuna.vacuna));
  }

  crearVacuna(vacuna: VacunaModel) {
    return this.httpClient.post(`${base_url}/vacunas`, vacuna, this.headers);
  }

  actualizarVacuna(vacuna: VacunaModel) {
    return this.httpClient.put(`${base_url}/vacunas/${vacuna.id}`, vacuna, this.headers);
  }

  elimiminarVacuna(vacuna: VacunaModel) {
    return this.httpClient.delete(`${base_url}/vacunas/${vacuna.id}`, this.headers);
  }
}
