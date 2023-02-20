import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePolicyDialogComponent } from './delete-policy-dialog.component';

describe('DeletePolicyDialogComponent', () => {
  let component: DeletePolicyDialogComponent;
  let fixture: ComponentFixture<DeletePolicyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePolicyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePolicyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
