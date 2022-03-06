import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirCarnetComponent } from './subir-carnet.component';

describe('SubirCarnetComponent', () => {
  let component: SubirCarnetComponent;
  let fixture: ComponentFixture<SubirCarnetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirCarnetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirCarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
