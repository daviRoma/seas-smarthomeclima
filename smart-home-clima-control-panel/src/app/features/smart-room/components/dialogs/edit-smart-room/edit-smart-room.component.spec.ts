import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSmartRoomComponent } from './edit-smart-room.component';

describe('EditSmartRoomComponent', () => {
  let component: EditSmartRoomComponent;
  let fixture: ComponentFixture<EditSmartRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSmartRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSmartRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
