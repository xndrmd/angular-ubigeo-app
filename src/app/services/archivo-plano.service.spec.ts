import { TestBed } from '@angular/core/testing';

import { ArchivoPlanoService } from './archivo-plano.service';

describe('ArchivoPlanoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArchivoPlanoService = TestBed.get(ArchivoPlanoService);
    expect(service).toBeTruthy();
  });
});
