import { TestBed } from '@angular/core/testing';

import { ApproveGetsterService } from './approve-getster.service';

describe('ApproveGetsterService', () => {
  let service: ApproveGetsterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproveGetsterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
