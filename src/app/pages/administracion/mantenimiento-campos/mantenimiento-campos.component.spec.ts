import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoCamposComponent } from './mantenimiento-campos.component';

describe('MantenimientoCamposComponent', () => {
  let component: MantenimientoCamposComponent;
  let fixture: ComponentFixture<MantenimientoCamposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoCamposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoCamposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
