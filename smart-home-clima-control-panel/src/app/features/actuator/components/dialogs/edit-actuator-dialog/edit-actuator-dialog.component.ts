import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SmartRoom } from 'src/app/models/smart-room.model';
import { Actuator, ActuatorRequest } from 'src/app/models/actuator.model';
import { AppState } from 'src/app/state/app.state';

import { ActuatorNewAction, ActuatorUpdateAction, ActuatorDeleteAction } from 'src/app/features/actuator/store/actions/actuator.actions';

export enum Types {
  Conditioner = 'CONDITIONER',
  Radiator = 'RADIATOR',
  Window = 'WINDOW'
}
@Component({
  selector: 'app-edit-actuator-dialog',
  templateUrl: './edit-actuator-dialog.component.html',
  styleUrls: ['./edit-actuator-dialog.component.css']
})
export class EditActuatorDialogComponent implements OnInit {
  
  public dialogConfig: any;
  public smartRoom: SmartRoom;
  public actuators: Actuator[];
  public deletedActuators: Actuator[];

  public types: any = Types;

  constructor(
    public dialogRef: MatDialogRef<EditActuatorDialogComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogRef.disableClose = false;

    this.dialogConfig = this.data;
    this.smartRoom = this.data.smartRoom;

    this.actuators = this.smartRoom.actuators ? JSON.parse(JSON.stringify(this.smartRoom.actuators)): [];
    this.deletedActuators = [];
  }

  ngOnInit(): void {}

  addActuator() {
    this.actuators?.push(new Actuator());
  }

  deleteActuator(sensorId: number) {
    let index = this.actuators?.findIndex(sensor => sensor.id == sensorId);
    if (index > -1) {
      if (this.actuators[index].id) this.deletedActuators.push(this.actuators[index]);
      this.actuators.splice(index, 1);
    }
  }

  confirm(): void {

    const payloads = {
      new: { actuators: this.actuators.filter( s => s.id == null), smartRoomId: this.smartRoom.id} as ActuatorRequest,
      update: { actuators: this.actuators.filter( s => s.id != null), smartRoomId: this.smartRoom.id } as ActuatorRequest,
      delete: { actuators: this.deletedActuators, smartRoomId: this.smartRoom.id } as ActuatorRequest
    };

    if (payloads.new.actuators && payloads.new.actuators.length) this.store.dispatch(ActuatorNewAction(payloads.new));
    if (payloads.update.actuators && payloads.update.actuators.length) this.store.dispatch(ActuatorUpdateAction(payloads.update));
    if (payloads.delete.actuators && payloads.delete.actuators.length) this.store.dispatch(ActuatorDeleteAction(payloads.delete));
    
    this.dialogRef.close({ result: 'close_after_update'});
  }

  closeDialog(): void {
    this.dialogRef.close({ result: 'close_cancel' });
  }

  cancel(): void {
    this.closeDialog();
  }

}
