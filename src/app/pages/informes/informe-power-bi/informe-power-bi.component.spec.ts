import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePowerBiComponent } from './informe-power-bi.component';

describe('InformePowerBiComponent', () => {
  let component: InformePowerBiComponent;
  let fixture: ComponentFixture<InformePowerBiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformePowerBiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformePowerBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
