import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

export class UsuarioModel {
  constructor(
    public primer_nombre: string,
    public primer_apellido: string,
    public numero_documento: string,
    public fecha_nacimiento: Date,
    public congregacion: number,
    public tipo_documento: number,
    public genero: number,
    public estado: boolean,
    public login?: string,
    public password?: string,
    public segundo_nombre?: string,
    public segundo_apellido?: string,
    public celular?: string,
    public email?: string,
    public imagen?: string
  ) {}

  get imagenUrl() {
    if (this.imagen.includes('https')) {
      return this.imagen;
    }
    if (this.imagen) {
      return `${base_url}/upload/usuarios/${this.imagen}`;
    } else {
      return `${base_url}/upload/usuarios/no-image`;
    }
  }
}
