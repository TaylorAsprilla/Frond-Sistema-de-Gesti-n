import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnChanges {
  @Input() totalUsuarios: number = 0;
  @Input() totalCongregaciones: number = 0;
  @Input() totalCampos: number = 0;
  @Input() totalMinisterios: number = 0;
  @Input() totalIngresos: number = 0;
  @Input() congregacionQueIngresa: string;

  @Output() onActualizarNumeroDeIngresos = new EventEmitter<boolean>();

  numeroDeIngresos: number = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalIngresos) {
      if (changes.totalIngresos.currentValue) {
        this.numeroDeIngresos = changes.totalIngresos.currentValue;
      }
    }
  }
  actualizarNumeroDeIngresos() {
    this.onActualizarNumeroDeIngresos.emit(true);
  }
}
