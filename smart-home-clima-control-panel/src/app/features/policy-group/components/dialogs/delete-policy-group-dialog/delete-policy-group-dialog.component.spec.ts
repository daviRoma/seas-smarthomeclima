import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePolicyGroupDialogComponent } from './delete-policy-group-dialog.component';

describe('DeletePolicyGroupDialogComponent', () => {
  let component: DeletePolicyGroupDialogComponent;
  let fixture: ComponentFixture<DeletePolicyGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePolicyGroupDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePolicyGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
