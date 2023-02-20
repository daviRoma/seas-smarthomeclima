import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteActuatorDialogComponent } from './delete-actuator-dialog.component';

describe('DeleteActuatorDialogComponent', () => {
  let component: DeleteActuatorDialogComponent;
  let fixture: ComponentFixture<DeleteActuatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteActuatorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteActuatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
