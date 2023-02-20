import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartRoomDetailComponent } from './smart-room-detail.component';

describe('DetailComponent', () => {
  let component: SmartRoomDetailComponent;
  let fixture: ComponentFixture<SmartRoomDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartRoomDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartRoomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
