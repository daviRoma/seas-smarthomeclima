import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SmartRoom } from 'src/app/models/smart-room.model';
import { PolicyGroup } from 'src/app/models/policy-group.model';
import { Policy, PolicyRequest } from 'src/app/models/policy.model';
import { AppState } from 'src/app/state/app.state';

import { PolicyNewAction, PolicyUpdateAction, PolicyDeleteAction } from 'src/app/features/policy/store/actions/policy.actions';
import Utility from 'src/app/shared/utility';

@Component({
  selector: 'app-edit-policy-dialog',
  templateUrl: './edit-policy-dialog.component.html',
  styleUrls: ['./edit-policy-dialog.component.css']
})
export class EditPolicyDialogComponent implements OnInit {
  
  public dialogConfig: any;
  public smartRoom: SmartRoom;
  public policyGroup: PolicyGroup;
  public policies!: Policy[];
  public deletedPolicies!: Policy[];

  constructor(
    public dialogRef: MatDialogRef<EditPolicyDialogComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data;
    this.smartRoom = this.data.smartRoom;
    this.policyGroup = this.smartRoom.policyGroups ? this.smartRoom.policyGroups[0] : new PolicyGroup();

    this.policies = [ ...this.policyGroup.policies ? this.policyGroup.policies : []];

  }

  ngOnInit(): void {
    this.policies = this.policies.map(policy => {
      return { ...policy, endHour:  Utility.getTimeAsString(policy.endHour), startHour: Utility.getTimeAsString(policy.startHour) };
    });
  }

  addPolicy() {
    this.policies?.push(new Policy());
  }

  deletePolicy(sensorId: number) {
    let index = this.policies?.findIndex(sensor => sensor.id == sensorId);
    if (index > -1) {
      this.policies.splice(index, 1);
      if (this.policies[index].id) this.deletedPolicies.push(this.policies[index]);
    }
  }

  confirm(): void {

    const payloads = {
      new: { 
        policies: this.policies.filter( s => s.id == null), 
        smartRoomId: this.smartRoom.id, 
        policyGroupId: this.policyGroup.id 
      } as PolicyRequest,
      update: { 
        policies: this.policies.filter( s => s.id != null), 
        smartRoomId: this.smartRoom.id,
        policyGroupId: this.policyGroup.id 
      } as PolicyRequest,
      delete: { 
        policies: this.deletedPolicies, 
        smartRoomId: this.smartRoom.id,
        policyGroupId: this.policyGroup.id 
      } as PolicyRequest
    };

    if (payloads.new.policies && payloads.new.policies.length) this.store.dispatch(PolicyNewAction({ payload: payloads.new }));
    if (payloads.update.policies && payloads.update.policies.length) this.store.dispatch(PolicyUpdateAction({ payload: payloads.update }));
    if (payloads.delete.policies && payloads.update.policies.length) this.store.dispatch(PolicyDeleteAction({ payload: payloads.delete }));
  }

  closeDialog(): void {
    this.dialogRef.close({ result: 'close_cancel' });
  }

  cancel(): void {
    this.closeDialog();
  }

}
