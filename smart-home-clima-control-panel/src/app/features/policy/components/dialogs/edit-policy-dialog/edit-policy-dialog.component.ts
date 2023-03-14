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

  private deletedPolicies!: Policy[];

  constructor(
    public dialogRef: MatDialogRef<EditPolicyDialogComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data;
    this.smartRoom = this.data.smartRoom;
    this.policyGroup = this.data.item;

    this.policies = this.policyGroup.policies ? JSON.parse(JSON.stringify(this.policyGroup.policies)): [];

    this.deletedPolicies = [];
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
      if (this.policies[index].id) this.deletedPolicies.push(this.policies[index]);
      this.policies.splice(index, 1);
    }
  }

  confirm(): void {

    let payloads = {
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
    payloads = this.transformPolicyDatetime(payloads);
    console.log('payloads', payloads);
    if (payloads.new.policies && payloads.new.policies.length) this.store.dispatch(PolicyNewAction(payloads.new));
    if (payloads.update.policies && payloads.update.policies.length) this.store.dispatch(PolicyUpdateAction(payloads.update));
    if (payloads.delete.policies && payloads.delete.policies.length) this.store.dispatch(PolicyDeleteAction(payloads.delete));
    
    this.dialogRef.close({ result: 'close_after_update' });
  }

  public cancel(): void {
    this.closeDialog();
  }

  private closeDialog(): void {
    this.dialogRef.close({ result: 'close_cancel' });
  }

  private transformPolicyDatetime(payloads: any): any {
    //2023-02-01 01:00:00

    payloads.new.policies = payloads.new.policies.map((p: any) => {
      let start: Date = new Date();
      let end: Date = new Date();
      start.setHours(Number(p.startHour.split(":")[0]));
      start.setMinutes(Number(p.startHour.split(":")[1]));
      end.setHours(Number(p.endHour.split(":")[0]));
      end.setMinutes(Number(p.endHour.split(":")[1]));

      return { ...p, startHour: Utility.dateToString(start), endHour: Utility.dateToString(end) };
    });

    payloads.update.policies = payloads.update.policies.map((p: any) => {
      let start: Date = new Date();
      let end: Date = new Date();
      start.setHours(Number(p.startHour.split(":")[0]));
      start.setMinutes(Number(p.startHour.split(":")[1]));
      end.setHours(Number(p.endHour.split(":")[0]));
      end.setMinutes(Number(p.endHour.split(":")[1]));

      return { ...p, startHour: Utility.dateToString(start), endHour: Utility.dateToString(end) };
    });

    payloads.delete.policies = payloads.delete.policies.map((p: any) => {
      return { ...p, startHour: null, endHour: null };
    });

    return payloads;
  }
}
