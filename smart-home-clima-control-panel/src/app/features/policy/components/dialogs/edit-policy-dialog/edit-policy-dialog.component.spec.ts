import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPolicyDialogComponent } from './edit-policy-dialog.component';

describe('EditPolicyDialogComponent', () => {
  let component: EditPolicyDialogComponent;
  let fixture: ComponentFixture<EditPolicyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPolicyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPolicyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
