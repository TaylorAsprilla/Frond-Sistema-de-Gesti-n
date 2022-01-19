import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCongregacionComponent } from './editar-congregacion.component';

describe('EditarCongregacionComponent', () => {
  let component: EditarCongregacionComponent;
  let fixture: ComponentFixture<EditarCongregacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCongregacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCongregacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
