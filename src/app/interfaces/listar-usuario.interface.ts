import { UsuarioModel } from '../models/usuario.model';

export interface ListarUsuario {
  totalUsuarios: number;
  usuarios: UsuarioModel[];
}
