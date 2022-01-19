import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscardor',
  templateUrl: './buscardor.component.html',
  styleUrls: ['./buscardor.component.css'],
})
export class BuscardorComponent implements OnInit {
  @Input() placeholder: string = '';

  constructor() {}

  ngOnInit(): void {}

  buscarUsuario(termino: string) {
    // if (termino.length === 0) {
    //   this.usuarios = this.usuariosTemporales;
    // } else {
    //   this.busquedasService.buscarUsuario(termino).subscribe((usuarios: any) => {
    //     this.usuarios = usuarios;
    //   });
    // }
  }
}
