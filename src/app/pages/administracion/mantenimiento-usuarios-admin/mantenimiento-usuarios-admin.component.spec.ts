import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenimientoUsuariosAdminComponent } from './mantenimiento-usuarios-admin.component';

describe('MantenimientoUsuariosAdminComponent', () => {
  let component: MantenimientoUsuariosAdminComponent;
  let fixture: ComponentFixture<MantenimientoUsuariosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MantenimientoUsuariosAdminComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoUsuariosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
