import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SmartRoom } from 'src/app/models/smart-room.model';
import { Sensor, SensorRequest } from 'src/app/models/sensor.model';
import { AppState } from 'src/app/state/app.state';

import { SensorNewAction, SensorUpdateAction, SensorDeleteAction } from 'src/app/features/sensor/store/actions/sensor.actions';

export enum Types {
  Temperature = 'TEMPERATURE',
  Motion = 'MOTION',
  Contact = 'CONTACT'
}
@Component({
  selector: 'app-edit-sensor-dialog',
  templateUrl: './edit-sensor-dialog.component.html',
  styleUrls: ['./edit-sensor-dialog.component.css']
})
export class EditSensorDialogComponent implements OnInit {
  
  public dialogConfig: any;
  public smartRoom: SmartRoom;
  public sensors!: Sensor[];
  public deletedSensors!: Sensor[];

  public types: any = Types;

  constructor(
    public dialogRef: MatDialogRef<EditSensorDialogComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data;
    this.smartRoom = this.data.smartRoom;

    this.sensors = [ ...this.smartRoom.sensors ? this.smartRoom.sensors : []];

  }

  ngOnInit(): void {
    
  }

  addSensor() {
    this.sensors?.push(new Sensor());
  }

  deleteSensor(sensorId: number) {
    let index = this.sensors?.findIndex(sensor => sensor.id == sensorId);
    if (index > -1) {
      this.sensors.splice(index, 1);
      if (this.sensors[index].id) this.deletedSensors.push(this.sensors[index]);
    }
  }

  confirm(): void {

    const payloads = {
      new: { sensors: this.sensors.filter( s => s.id == null), smartRoomId: this.smartRoom.id} as SensorRequest,
      update: { sensors: this.sensors.filter( s => s.id != null), smartRoomId: this.smartRoom.id } as SensorRequest,
      delete: { sensors: this.deletedSensors, smartRoomId: this.smartRoom.id } as SensorRequest
    };

    if (payloads.new.sensors) this.store.dispatch(SensorNewAction({ payload: payloads.new }));
    if (payloads.update.sensors) this.store.dispatch(SensorUpdateAction({ payload: payloads.update }));
    if (payloads.delete.sensors) this.store.dispatch(SensorDeleteAction({ payload: payloads.delete }));

    this.dialogRef.close({ result: 'close_after_update'});
  }

  closeDialog(): void {
    this.dialogRef.close({ result: 'close_cancel' });
  }

  cancel(): void {
    this.closeDialog();
  }

}
