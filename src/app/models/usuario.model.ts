import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

export enum Nombre {
  CONGREGACION = 'congregacion',
  CAMPO = 'campo',
  MINISTERIO = 'ministerio',
  TIPODOCUMENTO = 'tipo documento',
}

export class UsuarioModel {
  constructor(
    public id: string,
    public primer_nombre: string,
    public primer_apellido: string,
    public numero_documento: string,
    public fecha_nacimiento: Date,
    public id_congregacion: number,
    public id_tipoDocumento: number,
    public id_genero: number,
    public estado: boolean,
    public documentoTutor?: number,
    public id_vacuna?: number,
    public login?: string,
    public password?: string,
    public segundo_nombre?: string,
    public segundo_apellido?: string,
    public celular?: string,
    public email?: string,
    public vacuna?: number,
    public carnet?: string,
    public imagen?: string
  ) {}

  get imagenUrl() {
    if (!this.imagen) {
      return `${base_url}/uploads/usuarios/no-image.jpg`;
    } else if (this.imagen) {
      return `${base_url}/uploads/usuarios/${this.imagen}`;
    } else {
      return `${base_url}/uploads/usuarios/no-image.jpg`;
    }
  }

  get carnetUrl() {
    if (!this.carnet) {
      return `${base_url}/uploads/usuarios/no-image.jpg`;
    } else if (this.carnet) {
      return `${base_url}/uploads/carnets/${this.carnet}`;
    } else {
      return `${base_url}/uploads/usuarios/no-image.jpg`;
    }
  }
}
