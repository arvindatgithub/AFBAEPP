import { TestBed } from '@angular/core/testing';

import { EppCreateGrpSetupService } from './epp-create-grp-setup.service';

describe('EppCreateGrpSetupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EppCreateGrpSetupService = TestBed.get(EppCreateGrpSetupService);
    expect(service).toBeTruthy();
  });
});
