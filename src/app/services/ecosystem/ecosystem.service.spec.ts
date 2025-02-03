import { TestBed } from '@angular/core/testing';

import { EcosystemService } from './ecosystem.service';

describe('EcosystemService', () => {
  let service: EcosystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcosystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
