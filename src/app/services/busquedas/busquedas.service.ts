import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ListarUsuario } from 'src/app/interfaces/listar-usuario.interface';
import { MinisterioModel } from 'src/app/models/ministerio.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { MinisteriosComponent } from 'src/app/pages/administracion/ministerios/ministerios.component';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
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

  private transformarUsuarios(resultados: any[]): UsuarioModel[] {
    return resultados.map(
      (usuario) =>
        new UsuarioModel(
          usuario.id,
          usuario.primer_nombre,
          usuario.primer_apellido,
          usuario.numero_documento,
          usuario.fecha_nacimiento,
          usuario.congregacion,
          usuario.tipo_documento,
          usuario.genero,
          usuario.estado,
          usuario.login,
          usuario.password,
          usuario.segundo_nombre,
          usuario.segundo_apellido,
          usuario.celular,
          usuario.email,
          usuario.vacuna,
          usuario.imagen
        )
    );
  }

  private transformarMinisterios(resultados: any[]): MinisterioModel[] {
    return resultados.map(
      (ministerio) =>
        new MinisterioModel(
          ministerio.id,
          ministerio.nombre,
          ministerio.estado,
          ministerio.logo,
          ministerio.descripcion
        )
    );
  }

  buscarUsuario(termino: string) {
    return this.httpClient
      .get(`${base_url}/busquedas/usuarios/` + termino, this.headers)
      .pipe(map((respuesta: any) => this.transformarUsuarios(respuesta.busqueda)));
  }

  buscarMinisterio(termino: string) {
    return this.httpClient
      .get(`${base_url}/busquedas/ministerios/` + termino, this.headers)
      .pipe(map((respuesta: any) => this.transformarMinisterios(respuesta.busqueda)));
  }
}
