import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSmartRoomComponent } from './delete-smart-room.component';

describe('DeleteSmartRoomComponent', () => {
  let component: DeleteSmartRoomComponent;
  let fixture: ComponentFixture<DeleteSmartRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSmartRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSmartRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
