import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPolicyGroupDialogComponent } from './edit-policy-group-dialog.component';

describe('EditPolicyDialogComponent', () => {
  let component: EditPolicyGroupDialogComponent;
  let fixture: ComponentFixture<EditPolicyGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPolicyGroupDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPolicyGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
