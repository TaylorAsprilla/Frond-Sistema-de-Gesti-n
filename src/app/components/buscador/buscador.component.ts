import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() placeholder: string = '';
  @Input() validaInput: boolean = false;
  @Input() icono: string = '';

  @Output() onTerminoBusqueda = new EventEmitter<string>();

  busquedaUno: any;
  busquedaDos: any;

  mostrarError: boolean = false;
  buscadorForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buscadorForm = this.formBuilder.group({
      busquedaUno: ['', [Validators.required, Validators.minLength(4), Validators.pattern('/^[0-9]+$/')]],
      busquedaDos: ['', [Validators.required, Validators.minLength(4), Validators.pattern('/^[0-9]+$/')]],
    });
  }

  validaCampoBusqueda(termino: string = '') {
    if (!!this.validaInput) {
      let busquedaUno = this.buscadorForm.get('busquedaUno').value;
      let busquedaDos = this.buscadorForm.get('busquedaDos').value;

      this.mostrarError = false;

      if (busquedaUno !== busquedaDos) {
        this.mostrarError = true;
      } else {
        this.buscarUsuario(termino);
      }
    } else {
      this.buscarUsuario(termino);
    }
  }

  buscarUsuario(termino: string) {
    if (!this.mostrarError) {
      this.onTerminoBusqueda.emit(termino);
    } else {
      return;
    }
  }
}
