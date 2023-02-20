import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActuatorDialogComponent } from './edit-actuator-dialog.component';

describe('EditActuatorDialogComponent', () => {
  let component: EditActuatorDialogComponent;
  let fixture: ComponentFixture<EditActuatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditActuatorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditActuatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
