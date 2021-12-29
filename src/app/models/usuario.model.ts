import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

export class UsuarioModel {
  constructor(
    public primerNombre: string,
    public primerApellido: string,
    public numeroDocumento: string,
    public fechaNacimiento: Date,
    public congregacion: number,
    public tipoDocumento: number,
    public genero: number,
    public login?: string,
    public clave?: string,
    public segundoNombre?: string,
    public segundoApellido?: string,
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
