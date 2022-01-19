import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargando-informacion',
  templateUrl: './cargando-informacion.component.html',
  styleUrls: ['./cargando-informacion.component.css'],
})
export class CargandoInformacionComponent implements OnInit {
  @Input() cargando: boolean;
  constructor() {}

  ngOnInit(): void {}
}
