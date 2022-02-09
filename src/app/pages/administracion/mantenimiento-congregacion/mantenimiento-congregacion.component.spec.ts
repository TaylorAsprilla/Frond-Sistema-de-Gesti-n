import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenimientoCongregacionComponent } from './mantenimiento-congregacion.component';

describe('EditarCongregacionComponent', () => {
  let component: MantenimientoCongregacionComponent;
  let fixture: ComponentFixture<MantenimientoCongregacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MantenimientoCongregacionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoCongregacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
