import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarCongregacionIngresoComponent } from './seleccionar-congregacion-ingreso.component';

describe('SeleccionarCongregacionIngresoComponent', () => {
  let component: SeleccionarCongregacionIngresoComponent;
  let fixture: ComponentFixture<SeleccionarCongregacionIngresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarCongregacionIngresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarCongregacionIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
