import { TestBed } from '@angular/core/testing';

import { CarruselesService } from './carruseles.service';

describe('CarruselesService', () => {
  let service: CarruselesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarruselesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
