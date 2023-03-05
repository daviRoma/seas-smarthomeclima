import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { SmartRoom } from 'src/app/models/smart-room.model';
import { SmartRoomNewAction, SmartRoomUpdateAction } from 'src/app/features/smart-room/store/actions/smart-room.actions';

export enum SmartRoomType {
  BedRoom = 'BED_ROOM',
  LivingRoom = 'LIVING_ROOM',
  BathRoom = 'BATH_ROOM',
  KitchenRoom = 'KITCHEN_ROOM',
  DiningRoom = 'DINING_ROOM'
}

@Component({
  selector: 'app-edit-smart-room',
  templateUrl: './edit-smart-room.component.html',
  styleUrls: ['./edit-smart-room.component.css']
})
export class EditSmartRoomComponent {
  public dialogConfig: any;
  public smartRoom: SmartRoom;
  public smartRoomForm: FormGroup;

  public smartRoomType: any = SmartRoomType;

  constructor(
    public dialogRef: MatDialogRef<EditSmartRoomComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = data;
    this.smartRoom = new SmartRoom();
    
    this.smartRoomForm = this.formBuilder.group({
      number: [this.smartRoom.number, [Validators.required]],
      type: [this.smartRoom.type, [Validators.required]]
    });
    
    // Edit case
    if (this.data.smartRoom) {
      this.smartRoom = {...this.data.smartRoom};
      this.smartRoomForm.patchValue(this.smartRoom);
    }
  }

  onSubmit(event: any): void {
    event.preventDefault();

    const payload = this.smartRoomForm.value as SmartRoom;

    this.dialogConfig.operation === 'new' ?
      this.store.dispatch(SmartRoomNewAction({payload: { ...payload }})) :
      this.store.dispatch(SmartRoomUpdateAction({payload: { ...payload, id: this.smartRoom.id }}));
  }

  closeDialog(): void {
    this.dialogRef.close({ result: 'close_cancel' });
  }

  cancel(): void {
    this.closeDialog();
  }
}
