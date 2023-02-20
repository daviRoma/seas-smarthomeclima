import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SmartRoom } from 'src/app/models/smart-room.model';
import { AppState } from 'src/app/state/app.state';

import { SmartRoomDeleteAction } from 'src/app/features/smart-room/store/actions/smart-room.actions';
import * as smartRoomSelectors from 'src/app/features/smart-room/store/selectors/smart-room.selectors';

@Component({
  selector: 'app-delete-smart-room',
  templateUrl: './delete-smart-room.component.html',
  styleUrls: ['./delete-smart-room.component.css']
})
export class DeleteSmartRoomComponent implements OnInit, OnDestroy {
  public dialogConfig: any;
  public smartRoom!: SmartRoom;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialogRef: MatDialogRef<DeleteSmartRoomComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.item) {
      this.smartRoom = data.item;
    }
    this.dialogConfig = data;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  /**
   * Manage confirm click on delete window.
   */
  confirm(): void {
    this.store.dispatch(SmartRoomDeleteAction({id: this.smartRoom.id}))
    this.store
      .select(smartRoomSelectors.selectSmartRoomLoading)
      .pipe(takeUntil(this.destroy))
      .subscribe((loading: boolean) => {
        if (!loading) {
          this.dialogRef.close({result: 'close_after_delete' });
        }
      });
  }

  cancel(): void {
    this.closeDialog();
  }
}
