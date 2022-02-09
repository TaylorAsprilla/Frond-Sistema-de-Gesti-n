import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() placeholder: string = '';

  constructor() {}

  ngOnInit(): void {}

  buscarUsuario(termino: string) {
    //   if (termino.length === 0) {
    //     this.usuarios = this.usuariosTemporales;
    //   } else {
    //     this.busquedasService.buscarUsuario(termino).subscribe((usuarios: any) => {
    //       this.usuarios = usuarios;
    //     });
    //   }
  }
}
