import { TestBed } from '@angular/core/testing';

import { SmartRoomService } from './smart-room.service';

describe('SmartRoomServiceService', () => {
  let service: SmartRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
