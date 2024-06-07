import { TestBed } from '@angular/core/testing';

import { CryptpService } from './cryptp.service';

describe('CryptpService', () => {
  let service: CryptpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
