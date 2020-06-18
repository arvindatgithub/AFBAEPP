import { TestBed } from '@angular/core/testing';

import { CustomeppattributeService } from './customeppattribute.service';

describe('CustomeppattributeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomeppattributeService = TestBed.get(CustomeppattributeService);
    expect(service).toBeTruthy();
  });
});
