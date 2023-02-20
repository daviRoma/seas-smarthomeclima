import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as smartRoomSelectors from 'src/app/features/smart-room/store/selectors/smart-room.selectors';
import { AppState } from 'src/app/state/app.state';

import * as controlPanelSelector from 'src/app/store/control-panel.selectors';

import { ControlPanelUpdateAction } from 'src/app/store/control-panel.actions';

import { SmartRoomLoadOneAction, SmartRoomUpdateManuallyAction } from 'src/app/features/smart-room/store/actions/smart-room.actions';

import { EditSmartRoomComponent } from 'src/app/features/smart-room/components/dialogs/edit-smart-room/edit-smart-room.component';
import { DeleteSmartRoomComponent } from 'src/app/features/smart-room/components/dialogs/delete-smart-room/delete-smart-room.component';

import { MatDialog } from '@angular/material/dialog';

import { Channel, ControlPanel } from 'src/app/models/control-panel.model';
import { SmartRoom, SmartRoomRequest } from 'src/app/models/smart-room.model';
import { Sensor } from 'src/app/models/sensor.model';

import { SmartRoomDialogConf, DeleteDialogConf } from 'src/app/config/dialog.config';
import { EventMqttService } from 'src/app/services/event-mqtt.service';
import { IMqttMessage } from 'ngx-mqtt';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit, OnDestroy {

  public smartRoom: SmartRoom;
  public temperatureSensor?: Sensor;
  public controlPanel: ControlPanel;

  public params: any;

  public isLoading: boolean;
  public isStart: boolean;
  public temperatureValue: number;
  
  private subscribed: boolean;

  public editSmartRoomDialogRef: any;
  public deleteSmartRoomDialogRef: any;

  private topics: {
    temperature: string,
    conditioner: string,
    radiator: string,
    window: string
  };

  private routeParamsSubscription: Subscription;
  private destroy: Subject<boolean> = new Subject<boolean>();
  private subscription: Subscription = new Subscription();
  private topicSubscription: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private readonly eventMqtt: EventMqttService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.isLoading = true;
    this.isStart = true;
    this.subscribed = false;

    this.temperatureValue = 0;

    this.editSmartRoomDialogRef = { ...SmartRoomDialogConf };
    this.deleteSmartRoomDialogRef = { ...DeleteDialogConf };

    this.smartRoom = new SmartRoom();
    this.controlPanel = new ControlPanel();
    this.topics = { temperature: '', conditioner: '', radiator: '', window: ''};

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
    if (this.topicSubscription) this.topicSubscription.unsubscribe();
    
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
          this.temperatureSensor = this.smartRoom.sensors?.find(el => el.type == 'TEMPERATURE');

          // Set topics
          if (!this.subscribed) {
            this.topics.temperature = `smartroom/${this.smartRoom.id}/sensor/${this.temperatureSensor?.id}`;
            this.topics.radiator = `monitor/smartroom/${this.smartRoom.id}/actuator/${this.smartRoom.actuators?.find(el => el.type == 'RADIATOR')?.id}`;;
            this.topics.conditioner = `monitor/smartroom/${this.smartRoom.id}/actuator/${this.smartRoom.actuators?.find(el => el.type == 'CONDITIONER')?.id}`;
            this.topics.window = `monitor/smartroom/${this.smartRoom.id}/actuator/${this.smartRoom.actuators?.find(el => el.type == 'WINDOW')?.id}`;
          }

          this.loadControlPanelData();
        }
        this.isLoading = false;
    });
  }

  private loadSmartRoomData(): void {
    this.store.dispatch(SmartRoomLoadOneAction({ id: this.params.smartRoomId, dispatch: true } as SmartRoomRequest));
  }

  private loadControlPanelData(): void {
    const selectControlPanel = controlPanelSelector.selectEntitiesById(1);
    this.subscription.add(
      this.store
      .select(selectControlPanel)
      .pipe(takeUntil(this.destroy))
      .subscribe((result: ControlPanel | undefined) => {
        console.log('[Detail]::[ControlPanel]', result);

        if (result) {
          this.controlPanel = { ...result } as ControlPanel;
          let channel = this.controlPanel.channels.find(channel => channel.topic == this.topics.temperature);
          if (channel) this.temperatureValue = channel.messages[0].value;

          // Subscribe to topics
          if (!this.subscribed) {
            this.subscribeToSensorTopic(this.topics.temperature);
            this.subscribeToActuatorTopic(this.topics.radiator);
            this.subscribeToActuatorTopic(this.topics.conditioner);
            this.subscribeToActuatorTopic(this.topics.window);
            this.subscribed = true;
          }
        }
      })
    );
  }

  private subscribeToSensorTopic(topic: string): void {    
    console.log('[Subscribed]::[Topic]', topic);  
    this.topicSubscription.add(this.eventMqtt.topic(topic)
      .subscribe((data: IMqttMessage) => {

          let item = JSON.parse(data.payload.toString());
          let cp = JSON.parse(JSON.stringify(this.controlPanel)) as ControlPanel;
          console.log('[SensorEvent]', item);

          if (this.temperatureSensor?.id == item.id) {
            this.temperatureValue = Number(item.value);
            this.store.dispatch(SmartRoomUpdateManuallyAction({payload: {...this.smartRoom, temperature: Number(item.value)}}));
            this.temperatureSensor?.values?.push(Number(item.value));
          }
          let channel = this.controlPanel.channels.find(channel => channel.topic == topic);
          if (channel) cp.channels.find(ch => ch.topic == topic)?.messages.push(item);
          else cp.channels.push({ topic, messages: [item]} as Channel);
          this.store.dispatch(ControlPanelUpdateAction({payload: {...cp} as ControlPanel}));
      })
    );
  }

  private subscribeToActuatorTopic(topic: string): void {
    console.log('[Subscribed]::[Topic]', topic);

    this.topicSubscription.add(this.eventMqtt.topic(topic)
      .subscribe((data: IMqttMessage) => {
        let item = JSON.parse(data.payload.toString());
        let cp = JSON.parse(JSON.stringify(this.controlPanel)) as ControlPanel;
        console.log('[ActuatorEvent]', item);

        if (this.smartRoom.actuators) {
          let actuators = this.smartRoom.actuators.map(act => {
            if (act.id == item.id) return { ...act, active: Number(item.value) > 0, power: Number(item.value)};
            else return act;
          });
          this.store.dispatch(SmartRoomUpdateManuallyAction({payload: {...this.smartRoom, actuators: actuators}}));
        }
        let channel = this.controlPanel.channels.find(channel => channel.topic == topic);
        if (channel) cp.channels.find(ch => ch.topic == topic)?.messages.push(item);
        else cp.channels.push({ topic, messages: [item]} as Channel);
              
        this.store.dispatch(ControlPanelUpdateAction({payload: {...cp} as ControlPanel}));    
      })
    );
  }

}