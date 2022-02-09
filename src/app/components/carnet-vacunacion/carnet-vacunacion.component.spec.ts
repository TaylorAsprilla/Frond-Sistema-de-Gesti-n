import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetVacunacionComponent } from './carnet-vacunacion.component';

describe('CarnetVacunacionComponent', () => {
  let component: CarnetVacunacionComponent;
  let fixture: ComponentFixture<CarnetVacunacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarnetVacunacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarnetVacunacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
