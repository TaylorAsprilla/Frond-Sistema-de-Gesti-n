import { TestBed } from '@angular/core/testing';

import { MostrarImagenService } from './mostrar-imagen.service';

describe('MostrarImagenService', () => {
  let service: MostrarImagenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostrarImagenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
