import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SmartRoom } from 'src/app/models/smart-room.model';
import { PolicyGroup, PolicyGroupRequest } from 'src/app/models/policy-group.model';
import { AppState } from 'src/app/state/app.state';

import { PolicyGroupDeleteAction, PolicyGroupNewAction, PolicyGroupUpdateAction } from 'src/app/features/policy-group/store/actions/policy-group.actions';

export enum Seasons {
  Winter = 'WINTER',
  Summer = 'SUMMER'
}

export enum Modes {
  Eco = 'ECO',
  Comfort = 'COMFORT',
  Power = 'POWER'
}

@Component({
  selector: 'app-edit-policy-group-dialog',
  templateUrl: './edit-policy-group-dialog.component.html',
  styleUrls: ['./edit-policy-group-dialog.component.css']
})
export class EditPolicyGroupDialogComponent implements OnInit {
  
  public dialogConfig: any;
  public smartRoom: SmartRoom;
  public policyGroup: PolicyGroup;
  public policyGroups: PolicyGroup[];

  public modes: any = Modes;
  public seasons: any = Seasons;

  private deletedPolicyGroups!: PolicyGroup[];

  constructor(
    public dialogRef: MatDialogRef<EditPolicyGroupDialogComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data;
    this.smartRoom = this.data.smartRoom;

    this.policyGroup = this.data.item;

    this.policyGroups = this.data.smartRoom.policyGroups && this.data.smartRoom.policyGroups.length ? JSON.parse(JSON.stringify(this.data.smartRoom.policyGroups)) : [new PolicyGroup()];
    this.deletedPolicyGroups = [];
  }

  ngOnInit(): void {}

  addPolicyGroup() {
    this.policyGroups?.push(new PolicyGroup());
  }

  deletePolicyGroup(groupId: number) {
    let index = this.policyGroups?.findIndex(group => group.id == groupId);
    if (index > -1) {
      if (this.policyGroups[index].id) this.deletedPolicyGroups.push(this.policyGroups[index]);
      this.policyGroups.splice(index, 1);
    }
  }

  confirm(): void {

    let payloads = {
      new: { 
        policyGroups: this.policyGroups.filter( g => g.id == null), 
        smartRoomId: this.smartRoom.id, 
      } as PolicyGroupRequest,
      update: { 
        policyGroups: this.policyGroups.filter( g => g.id != null), 
        smartRoomId: this.smartRoom.id,
      } as PolicyGroupRequest,
      delete: { 
        policyGroups: this.deletedPolicyGroups, 
        smartRoomId: this.smartRoom.id,
      } as PolicyGroupRequest
    };

    if (payloads.new.policyGroups && payloads.new.policyGroups.length) this.store.dispatch(PolicyGroupNewAction(payloads.new));
    if (payloads.update.policyGroups && payloads.update.policyGroups.length) this.store.dispatch(PolicyGroupUpdateAction(payloads.update));
    if (payloads.delete.policyGroups && payloads.delete.policyGroups.length) this.store.dispatch(PolicyGroupDeleteAction(payloads.delete));
    
    this.dialogRef.close({ result: 'close_after_update' });
  }

  closeDialog(): void {
    this.dialogRef.close({ result: 'close_cancel' });
  }

  cancel(): void {
    this.closeDialog();
  }

}
