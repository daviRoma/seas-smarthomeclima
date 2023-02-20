import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { serverConfiguration } from 'src/app/config/server.config';

import { Actuator, ActuatorRequest } from 'src/app/models/actuator.model';

@Injectable({
  providedIn: 'root',
}) 
export class ActuatorService {
  private BASE_URL = serverConfiguration.api;

  constructor(
    private logger: NGXLogger,
    private httpClient: HttpClient
  ) {}

  /**
   * Get All actuators by smartRoomId
   * @param smartRoomId : string
   */
  public getActuators(smartRoomId: number): Observable<Actuator[]> {
    this.logger.debug('ActuatorService', 'getActuators', 'retrieving...');
    const url = `${this.BASE_URL}/smartrooms/${smartRoomId}/actuators`;
    const options = { };

    return this.httpClient.get<Actuator[]>(url, options);
  }

  /**
   * Get actuator by smartRoomId and actuatorId
   * @param request : Actuator
   */
  public getActuator(actuatorId: number): Observable<Actuator> {
    this.logger.debug('ActuatorService', 'getActuator', 'retrieving one...');
    const url = `${this.BASE_URL}/actuators/${actuatorId}`;
    return this.httpClient.get<Actuator>(url, { });
  }

  /**
   * Create new actuator
   * @param request : Actuator
   */
  public createActuator(request: ActuatorRequest): Observable<any> {
    this.logger.debug('ActuatorService', 'createActuator', request);
    const url = `${this.BASE_URL}/actuators`;
    return this.httpClient.post<ActuatorRequest>(url, request, { });
  }

  /**
   * Update actuator
   * @param request : ActuatorRequest
   */
  public updateActuator(request: ActuatorRequest): Observable<any> {
    this.logger.debug('ActuatorService', 'updateActuator', request);
    const url = `${this.BASE_URL}/actuators`;
    return this.httpClient.put<any>(url, request, { });
  }

  /**
   * Delete actuator by id
   * @param request : ActuatorRequest
   */
  public deleteActuator(request: ActuatorRequest): Observable<any> {
    this.logger.debug('ActuatorService', 'deleteActuator', request);
    const url = `${this.BASE_URL}/actuators`;
    return this.httpClient.delete<any>(url, { body: request });
  }

}