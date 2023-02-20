import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SmartRoom } from 'src/app/models/smart-room.model';
import { PolicyGroup, PolicyGroupRequest } from 'src/app/models/policy-group.model';
import { AppState } from 'src/app/state/app.state';

import { PolicyGroupNewAction, PolicyGroupUpdateAction } from 'src/app/features/policy-group/store/actions/policy-group.actions';

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
  public policyGroup: PolicyGroup
  public policyGroupForm: FormGroup;

  public modes: any = Modes;
  public seasons: any = Seasons;

  constructor(
    public dialogRef: MatDialogRef<EditPolicyGroupDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data;
    this.smartRoom = this.data.smartRoom;

    this.policyGroup = this.smartRoom.policyGroups ? this.smartRoom.policyGroups.filter(pg => pg.active)[0] : new PolicyGroup();

    this.policyGroupForm = this.formBuilder.group({
      season: [this.policyGroup.season, [Validators.required]],
      mode: [this.policyGroup.mode, [Validators.required]],
      active: [this.policyGroup.active],
      startDate: [this.policyGroup.startDate],
      endDate: [this.policyGroup.endDate]
    });

    // Edit case
    if (this.data.smartroom) {
      this.smartRoom = {...this.data.smartRoom};
      this.policyGroupForm.patchValue(this.policyGroup);
    }
  }

  ngOnInit(): void {
    
  }

  onSubmit(event: any): void {
    event.preventDefault();

    const payload = { policyGroup: this.policyGroupForm.value as PolicyGroup, smartRoomId: this.smartRoom.id } as PolicyGroupRequest;

    this.dialogConfig.operation === 'new' ?
      this.store.dispatch(PolicyGroupNewAction({payload})) :
      this.store.dispatch(PolicyGroupUpdateAction({payload}));
  }

  closeDialog(): void {
    this.dialogRef.close({ result: 'close_cancel' });
  }

  cancel(): void {
    this.closeDialog();
  }

}
