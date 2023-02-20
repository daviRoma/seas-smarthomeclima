import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartRoomListComponent } from './smart-room-list.component';

describe('SmartRoomListComponent', () => {
  let component: SmartRoomListComponent;
  let fixture: ComponentFixture<SmartRoomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartRoomListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
