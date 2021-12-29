export interface UsuarioInterface {
  id?: number;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  numeroDocumento: string;
  email?: string;
  celular?: string;
  fechaNacimiento: Date;
  congregacion: number;
  tipoDocumento: number;
  genero: number;
}
