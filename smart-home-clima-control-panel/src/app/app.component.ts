import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { IMqttMessage } from 'ngx-mqtt';

import { EventMqttService } from './services/event-mqtt.service';
import { AppState } from './state/app.state';

import { SmartRoom } from 'src/app/models/smart-room.model';
import { Channel, Monitor } from 'src/app/models/monitor.model';

import { SmartRoomLoadAction, SmartRoomUpdateManuallyAction } from 'src/app/features/smart-room/store/actions/smart-room.actions';
import { MonitorUpdateAction } from 'src/app/store/monitor.actions';
import * as smartRoomSelectors from 'src/app/features/smart-room/store/selectors/smart-room.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smart-home-clima-control-panel';
  
  private subscription: Subscription = new Subscription();
  private destroy: Subject<boolean> = new Subject<boolean>();

  public smartRooms?: SmartRoom[];
  public monitor!: Monitor;

  private subscribed: Boolean;

  constructor(
    private readonly eventMqtt: EventMqttService,
    private store: Store<AppState>
  ) {
    this.subscribed = false;
  }

  ngOnInit(): void {
    this.monitor = new Monitor();
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
        })
    );
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
          this.smartRooms = response;

          if (!this.subscribed) {
            this.smartRooms.forEach(smartRoom => {
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

  private subscribeToSensorTopic(topic: string): void {    
    console.log('[Subscribed]::[Topic]', topic);  
    this.subscription.add(this.eventMqtt.topic(topic)
      .subscribe((data: IMqttMessage) => {

          let item = JSON.parse(data.payload.toString());
          let _monitor = JSON.parse(JSON.stringify(this.monitor)) as Monitor;
          console.log('[SensorEvent]', item);
          
          let channel = this.monitor.channels.find(channel => channel.topic == topic);
          if (channel) this.monitor.channels.find(ch => ch.topic == topic)?.messages.push(item);
          else _monitor.channels.push({ topic, messages: [item]} as Channel);
          this.store.dispatch(MonitorUpdateAction({payload: {..._monitor} as Monitor}));

          this.smartRooms?.forEach(smartRoom => {
            if (smartRoom.sensors?.find(s => s.id == item.id)) {
              smartRoom.sensors?.find(s => s.id == item.id)?.values.push(Number(item.value));
              let payload = smartRoom.sensors?.find(s => s.id == item.id)?.type == 'TEMPERATURE' ? {
                ...smartRoom,
                temperature: Number(item.value)
              } : {...smartRoom};
              this.store.dispatch(SmartRoomUpdateManuallyAction({payload}));
            } 
          });
      })
    );
  }

  private subscribeToActuatorTopic(topic: string): void {
    console.log('[Subscribed]::[Topic]', topic);

    this.subscription.add(this.eventMqtt.topic(topic)
      .subscribe((data: IMqttMessage) => {
        let item = JSON.parse(data.payload.toString());
          let _monitor = JSON.parse(JSON.stringify(this.monitor)) as Monitor;
          console.log('[ActuatorEvent]', item);
          
          let channel = this.monitor.channels.find(channel => channel.topic == topic);
          if (channel) this.monitor.channels.find(ch => ch.topic == topic)?.messages.push(item);
          else _monitor.channels.push({ topic, messages: [item]} as Channel);
          this.store.dispatch(MonitorUpdateAction({payload: {..._monitor} as Monitor}));

          this.smartRooms?.forEach(smartRoom => {
            let actuators = smartRoom.actuators?.map(act => {
              console.log('ACT',act);
              if (act.id == item.id) act.power ? act.power.push(Number(item.value)) : act.power = [Number(item.value)];
              return act;
            }); 
            this.store.dispatch(SmartRoomUpdateManuallyAction({payload: {...smartRoom, actuators: actuators}}));
          });
      })
    );
  }

}
