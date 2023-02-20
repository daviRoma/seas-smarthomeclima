import { TestBed } from '@angular/core/testing';

import { PolicyGroupService } from './policy-group.service';

describe('PolicyGroupService', () => {
  let service: PolicyGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
