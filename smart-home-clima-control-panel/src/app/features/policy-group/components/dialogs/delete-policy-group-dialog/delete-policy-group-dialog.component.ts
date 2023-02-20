import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { PolicyGroup, PolicyGroupRequest} from 'src/app/models/policy-group.model';
import { PolicyGroupDeleteAction } from 'src/app/features/policy-group/store/actions/policy-group.actions';

@Component({
  selector: 'app-delete-policy-group-dialog',
  templateUrl: './delete-policy-group-dialog.component.html',
  styleUrls: ['./delete-policy-group-dialog.component.css']
})
export class DeletePolicyGroupDialogComponent implements OnInit {
  public dialogConfig: any;
  public policyGroup: PolicyGroup;

  constructor(
    public dialogRef: MatDialogRef<DeletePolicyGroupDialogComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data;
    this.policyGroup = this.data.item;
  }

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  /**
   * Manage confirm click on delete window.
   */
  confirm(): void {
    this.store.dispatch(PolicyGroupDeleteAction(
      {
        payload: {
          smartRoomId: this.policyGroup.smartRoom.id,
          policyGroup: { ...this.policyGroup }
        } as PolicyGroupRequest
      }
    ));

    this.dialogRef.close({ result: 'close_after_delete' });
  }

  cancel(): void {
    this.closeDialog();
  }

}