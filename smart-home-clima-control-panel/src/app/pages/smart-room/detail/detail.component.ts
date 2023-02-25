import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as smartRoomSelectors from 'src/app/features/smart-room/store/selectors/smart-room.selectors';
import { AppState } from 'src/app/state/app.state';

import * as monitorSelector from 'src/app/store/monitor.selectors';

import { SmartRoomLoadOneAction } from 'src/app/features/smart-room/store/actions/smart-room.actions';

import { EditSmartRoomComponent } from 'src/app/features/smart-room/components/dialogs/edit-smart-room/edit-smart-room.component';
import { DeleteSmartRoomComponent } from 'src/app/features/smart-room/components/dialogs/delete-smart-room/delete-smart-room.component';

import { MatDialog } from '@angular/material/dialog';

import { Channel, Monitor } from 'src/app/models/monitor.model';
import { SmartRoom, SmartRoomRequest } from 'src/app/models/smart-room.model';

import { SmartRoomDialogConf, DeleteDialogConf } from 'src/app/config/dialog.config';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit, OnDestroy {

  public smartRoom: SmartRoom;
  public monitor: Monitor;

  public params: any;

  public isLoading: boolean;
  public isStart: boolean;

  public temperatureValues: number[];
  public motionValues: number[];
  public powerValues: number[];
  
  public editSmartRoomDialogRef: any;
  public deleteSmartRoomDialogRef: any;

  private routeParamsSubscription: Subscription;
  private destroy: Subject<boolean> = new Subject<boolean>();
  private subscription: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.isLoading = true;
    this.isStart = true;

    this.temperatureValues = [];
    this.motionValues = [];
    this.powerValues = [];

    this.editSmartRoomDialogRef = { ...SmartRoomDialogConf };
    this.deleteSmartRoomDialogRef = { ...DeleteDialogConf };

    this.smartRoom = new SmartRoom();
    this.monitor = new Monitor();

    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      if (params['smartroom_id']) {
        this.params = { smartRoomId: parseInt(params['smartroom_id'])};
        // Select smartRoom from store by url parameter
        if (this.isStart) {
          this.loadSmartRoomData();
          this.isStart = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.store
      .select(smartRoomSelectors.selectSmartRoomLoading)
      .pipe(takeUntil(this.destroy))
      .subscribe((loading) => {
        if (!loading) {
          this.loadWithSelectors();
        }
      });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
    this.store.complete();
    this.destroy.next(true);
    this.destroy.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();    
  }

  public openEditSmartRoomDialog(): void {
    this.editSmartRoomDialogRef.data.smartRoom = { ...this.smartRoom };
    this.editSmartRoomDialogRef.data.operation = 'edit'; 
    this.editSmartRoomDialogRef.data.title = 'Edit Smart Room';
    this.editSmartRoomDialogRef.backdropClass= 'blurred';

    const newDialogRef = this.dialog.open(
      EditSmartRoomComponent,
      this.editSmartRoomDialogRef
    );

    this.subscription.add(
      newDialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_update') {
        }
      })
    );
  }

  public openSmartRoomDeleteDialog(): void {
    this.deleteSmartRoomDialogRef.data.item = { ...this.smartRoom };
    const dialogRef = this.dialog.open(
      DeleteSmartRoomComponent,
      this.deleteSmartRoomDialogRef
    );

    this.subscription.add(
      dialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_delete') {
          this.router.navigate(['/control-panel']);
        }
      })
    );
  }

  private loadWithSelectors(): void {
    const selectSmartRoom = smartRoomSelectors.selectEntitiesById(this.params.smartRoomId);
    this.store
      .select(selectSmartRoom)
      .pipe(takeUntil(this.destroy))
      .subscribe((smartRoom: SmartRoom | undefined) => {
        console.log('[SmartRoom]', smartRoom);

        if (smartRoom) {
          this.smartRoom = { ...smartRoom };
          let temperatureSensor = this.smartRoom.sensors?.find(el => el.type == 'TEMPERATURE');
          let motionSensor = this.smartRoom.sensors?.find(el => el.type == 'MOTION');
          let powerActuator = this.smartRoom.actuators?.find(el => el.power);

          this.temperatureValues = temperatureSensor?.values ? [...temperatureSensor.values] : [];
          this.motionValues = motionSensor?.values ? [...motionSensor.values] : [];
          this.powerValues = powerActuator?.values ? [...powerActuator.values] : [];
          this.loadMonitorData();
        }
        this.isLoading = false;
    });
  }

  private loadSmartRoomData(): void {
    this.store.dispatch(SmartRoomLoadOneAction({ id: this.params.smartRoomId, dispatch: true } as SmartRoomRequest));
  }

  private loadMonitorData(): void {
    const selectMonitor = monitorSelector.selectEntitiesById(1);
    this.subscription.add(
      this.store
      .select(selectMonitor)
      .pipe(takeUntil(this.destroy))
      .subscribe((result: Monitor | undefined) => {
        console.log('[Detail]::[Monitor]', result);

        if (result) {
          this.monitor = { ...result } as Monitor;
        }
      })
    );
  }

}