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
  public tipo: 'usuarios' | 'ministerios';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(id: string, tipo: 'usuarios' | 'ministerios', imagen: string = 'no-image.jpg') {
    console.log('Imagen', imagen, tipo);
    this.id = id;
    this.imagen = imagen;
    this._ocultarModal = false;
    this.tipo = tipo;

    if (imagen.includes('https')) {
      this.imagen = imagen;
    } else {
      this.imagen = `${base_url}/uploads/${tipo}/${imagen}`;
    }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() {}
}
