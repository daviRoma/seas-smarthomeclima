import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventMqttService {

  private endpoint: string;

  constructor(
    private _mqttService: MqttService,
  ) {
    this.endpoint = 'tcp://localhost:1883';
  }

  topic(name: string): Observable<IMqttMessage> {
    let topicName = `${name}`;     
    return this._mqttService.observe(topicName);
  }
}
