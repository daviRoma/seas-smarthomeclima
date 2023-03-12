import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { serverConfiguration } from 'src/app/config/server.config';

import { Sensor, SensorRequest } from 'src/app/models/sensor.model';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  private BASE_URL = serverConfiguration.api;

  constructor(
    private logger: NGXLogger,
    private httpClient: HttpClient
  ) {}

  /**
   * Get All sensors by smartRoomId
   * @param smartRoomId : string
   */
  public getSensors(smartRoomId: number): Observable<Sensor[]> {
    this.logger.debug('SensorService', 'getSensors', 'retrieving...');
    const url = `${this.BASE_URL}/smartrooms/${smartRoomId}/sensors`;
    const options = { };

    return this.httpClient.get<any>(url, options);
  }

  /**
   * Get sensor by smartRoomId and sensorId
   * @param request : Sensor
   */
  public getSensor(sensorId: number): Observable<Sensor> {
    this.logger.debug('SensorService', 'getSensor', 'retrieving one...');
    const url = `${this.BASE_URL}/sensors/${sensorId}`;
    return this.httpClient.get<Sensor>(url, { });
  }

  /**
   * Create new sensor
   * @param request : Sensor
   */
  public createSensor(request: SensorRequest): Observable<any> {
    this.logger.debug('SensorService', 'createSensor', request);
    const url = `${this.BASE_URL}/sensors`;
    return this.httpClient.post<SensorRequest>(url, request, { });
  }

  /**
   * Update sensor
   * @param request : SensorRequest
   */
  public updateSensor(request: SensorRequest): Observable<any> {
    this.logger.debug('SensorService', 'updateSensor', request);
    const url = `${this.BASE_URL}/sensors`;

    return this.httpClient.put<any>(url, request, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  /**
   * Delete sensor by id
   * @param request : SensorRequest
   */
  public deleteSensor(request: SensorRequest): Observable<any> {
    this.logger.debug('SensorService', 'deleteSensor', request.sensors);
    const url = `${this.BASE_URL}/sensors`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: request
    };
    return this.httpClient.delete<any>(url, options);
  }

}