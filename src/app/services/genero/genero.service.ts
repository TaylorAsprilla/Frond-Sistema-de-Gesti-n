import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GeneroModel } from 'src/app/models/genero.model';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class GeneroService {
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

  listarGenero() {
    return this.httpClient
      .get(`${base_url}/genero`, this.headers)
      .pipe(map((genero: { ok: boolean; genero: GeneroModel[] }) => genero.genero));
  }
}
