import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { IMqttMessage } from 'ngx-mqtt';

import { EventMqttService } from './services/event-mqtt.service';
import { AppState } from './state/app.state';

import { SmartRoom } from 'src/app/models/smart-room.model';
import { Channel, Monitor } from 'src/app/models/monitor.model';

import * as monitorSelector from 'src/app/store/monitor.selectors';
import * as smartRoomSelectors from 'src/app/features/smart-room/store/selectors/smart-room.selectors';

import { MonitorUpdateAction } from 'src/app/store/monitor.actions';
import { SmartRoomUpdateManuallyAction } from 'src/app/features/smart-room/store/actions/smart-room.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smart-home-clima-control-panel';
  
  private subscription: Subscription = new Subscription();
  private destroy: Subject<boolean> = new Subject<boolean>();
  
  private _smartRooms!: SmartRoom[];
  private _monitor!: Monitor;
  private _sensorChannels!: Channel[];
  private _actuatorChannels!: Channel[];

  private updating: Boolean;
  private subscribed: Boolean;

  constructor(
    private readonly eventMqtt: EventMqttService,
    private store: Store<AppState>
  ) {
    this.subscribed = false;
    this.updating = false;

    this._monitor = new Monitor();
    this._sensorChannels = [];
    this._actuatorChannels = [];
  }

  ngOnInit(): void {

    // Select smart rooms
    this.subscription.add(
      this.store
        .select(smartRoomSelectors.selectSmartRoomLoading)
        .pipe(takeUntil(this.destroy))
        .subscribe((loading) => {
          if (loading) {
            this._smartRooms = [];
          } else {
            this.selectSmartRooms();
          }
        })
    );

    this.subscription.add(
      this.store
      .select(monitorSelector.selectEntitiesById(1))
      .pipe(takeUntil(this.destroy))
      .subscribe((result: Monitor | undefined) => {
        console.log('[AppComponent]::[Monitor]', result);
        if (result) this._monitor = JSON.parse(JSON.stringify(result)) as Monitor;
      })
    );

    // update data every 30 seconds
    setInterval(() => {
      this.updateSmartRoomsData();
      this.updateMonitorChannels();
    }, 30000);
  }

  ngOnDestroy(): void {
    this.store.complete();
    this.destroy.next(true);
    this.destroy.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();    
  }
  
  private selectSmartRooms(): void {
    this.store
      .select(smartRoomSelectors.selectAllSmartRoom)
      .pipe(takeUntil(this.destroy))
      .subscribe((response: SmartRoom[]) => {
        if (response.length) {
          this._smartRooms = JSON.parse(JSON.stringify(response)) as SmartRoom[];

          if (!this.subscribed) {
            this._smartRooms.forEach(smartRoom => {
              // Subscribe to sensor topics
              smartRoom.sensors?.forEach(sensor => {
                this.subscribeToSensorTopic(`smartroom/${smartRoom.id}/sensor/${sensor.id}`);
              });
              // Subscribe to actuator topics
              smartRoom.actuators?.forEach(actuator => {
                this.subscribeToActuatorTopic(`monitor/smartroom/${smartRoom.id}/actuator/${actuator.id}`);
              })
            });
            this.subscribed = true;
          }

        }
      });
  }

  private updateSmartRoomsData(): void {
    this._smartRooms = this._smartRooms.map(smartRoom => {
      this._sensorChannels.forEach( sc => {
        let sensor = smartRoom.sensors.find(sns => sns.id == sc.deviceId);
        if (sensor) {
          let values = sc.messages.map(msg => msg.value);
          smartRoom.sensors.find(sns => sns.id == sc.deviceId)!.values = values;
          if (sensor.type === 'TEMPERATURE') smartRoom.temperature = values[values.length - 1];
        }
      });
      this._actuatorChannels.forEach( ac => {
        let actuator = smartRoom.actuators.find(act => act.id == ac.deviceId);
        if (actuator) {
          let values = ac.messages.map(msg => msg.value);
          smartRoom.actuators.find(act => act.id == ac.deviceId)!.values = values;
          smartRoom.actuators.find(act => act.id == ac.deviceId)!.power = values[values.length - 1];
        }
      });
      return smartRoom;
    });

    this.store.dispatch(SmartRoomUpdateManuallyAction({payload: this._smartRooms}));
  }

  private updateMonitorChannels(): void {
    this.store.dispatch(MonitorUpdateAction({payload: {...this._monitor, channels: [...this._sensorChannels, ...this._actuatorChannels]} as Monitor}));
  }

  private subscribeToSensorTopic(topic: string): void {    
    console.log('[Subscribed]::[Topic]', topic);  
    this.subscription.add(this.eventMqtt.topic(topic)
      .subscribe((data: IMqttMessage) => {
        console.log('[SensorEvent]', data.payload);

        let item = JSON.parse(data.payload.toString());
          
        // find channel and push new item
        if (this._sensorChannels && this._sensorChannels.find(ch => ch.topic == topic)) this._sensorChannels.find(ch => ch.topic == topic)?.messages.push(item);
        else this._sensorChannels.push({ topic, messages: [item]} as Channel);
      })
    );
  }

  private subscribeToActuatorTopic(topic: string): void {
    console.log('[Subscribed]::[Topic]', topic);

    this.subscription.add(this.eventMqtt.topic(topic)
      .subscribe((data: IMqttMessage) => {
        console.log('[ActuatorEvent]', data.payload);
        let item = JSON.parse(data.payload.toString());
        
        // find channel and push new item
        if (this._actuatorChannels && this._actuatorChannels.find(ch => ch.topic == topic)) this._actuatorChannels.find(ch => ch.topic == topic)?.messages.push(item);
        else this._actuatorChannels.push({ topic, messages: [item]} as Channel);
      })
    );
  }

}
