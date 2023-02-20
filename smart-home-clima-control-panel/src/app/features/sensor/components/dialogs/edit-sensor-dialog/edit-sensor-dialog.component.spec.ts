import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSensorDialogComponent } from './edit-sensor-dialog.component';

describe('EditSensorDialogComponent', () => {
  let component: EditSensorDialogComponent;
  let fixture: ComponentFixture<EditSensorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSensorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSensorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
