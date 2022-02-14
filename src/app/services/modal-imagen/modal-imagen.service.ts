import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;
  public id: string;
  public imagen?: string;
  public tipo: 'usuarios' | 'ministerios' | 'carnets';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  get imagenUrl() {
    if (this.imagen) {
      return this.imagen;
    } else {
      return `${base_url}/uploads/usuarios/no-image.jpg`;
    }
  }

  abrirModal(id: string, tipo: 'usuarios' | 'ministerios' | 'carnets', imagen: string = 'no-image.jpg') {
    this.id = id;
    this.imagen = imagen;
    this._ocultarModal = false;
    this.tipo = tipo;

    if (imagen === null || !imagen) {
      return `${base_url}/uploads/usuarios/no-image.jpg`;
    } else {
      this.imagen = `${base_url}/uploads/${tipo}/${imagen}`;
    }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() {}
}
