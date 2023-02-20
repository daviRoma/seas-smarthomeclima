import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { SmartRoom } from 'src/app/models/smart-room.model';
import { Policy } from 'src/app/models/policy.model';
import { PolicyGroup } from 'src/app/models/policy-group.model';
import { Sensor } from 'src/app/models/sensor.model';
import { Actuator } from 'src/app/models/actuator.model';

import { EditSmartRoomComponent } from '../dialogs/edit-smart-room/edit-smart-room.component';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { AppState } from 'src/app/state/app.state';

import { SmartRoomLoadAction } from 'src/app/features/smart-room/store/actions/smart-room.actions';
import * as smartRoomSelectors from 'src/app/features/smart-room/store/selectors/smart-room.selectors';

@Component({
  selector: 'app-smart-room-list',
  templateUrl: './smart-room-list.component.html',
  styleUrls: ['./smart-room-list.component.css']
})
export class SmartRoomListComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  public smartRooms?: SmartRoom[];
  public isLoading: boolean;
  public smartRoomTotal: number;

  public error$: Observable<boolean> | undefined;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    public newSmartRoomDialog: MatDialog,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.isLoading = true;
    this.smartRoomTotal = 0;

    this.smartRooms = [];
  }

  ngOnInit(): void {
    this.store.dispatch(SmartRoomLoadAction());

    this.subscription.add(
      this.store
        .select(smartRoomSelectors.selectSmartRoomLoading)
        .pipe(takeUntil(this.destroy))
        .subscribe((loading) => {
          if (loading) {
            this.smartRooms = [];
          } else {
            this.selectSmartRooms();
          }
          this.isLoading = loading;
        })
    );

    this.error$ = this.store.pipe(select(smartRoomSelectors.selectSmartRoomError));
  }
  
  public openNewSmartRoomModal(): void {
    const dialogRef = this.newSmartRoomDialog.open(EditSmartRoomComponent, {
      width: '40%',
      position: { top: '4%' },
      data: {
          title: 'New Smart Room',
          operation: 'new',
      },
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_new') {
        }
      })
    );
  }

  private selectSmartRooms(): void {
    this.store
      .select(smartRoomSelectors.selectAllSmartRoom)
      .pipe(takeUntil(this.destroy))
      .subscribe((response: SmartRoom[]) => {
        if (response.length) {
          this.smartRooms = response;
        }
      });

    this.store
      .select(smartRoomSelectors.selectSmartRoomTotal)
      .pipe(takeUntil(this.destroy))
      .subscribe((total) => (this.smartRoomTotal = total));
  }

  ngOnDestroy(): void {}

}
