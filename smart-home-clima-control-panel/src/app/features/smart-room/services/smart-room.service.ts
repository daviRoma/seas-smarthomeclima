import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';

import { serverConfiguration } from 'src/app/config/server.config';
import { SmartRoom } from '../../../models/smart-room.model';

@Injectable({
  providedIn: 'root'
})
export class SmartRoomService {

  private BASE_URL = serverConfiguration.api;

  constructor(
    private logger: NGXLogger,
    private httpClient: HttpClient
  ) { }

  /**
   * Get All Smart Rooms
   * @return Observable<SmartRoom>
   */
  public getAllSmartRooms(): Observable<SmartRoom[]> {
    this.logger.debug('SmartRoomService', 'getAllSmartRooms', 'retrieving...');
    const url = `${this.BASE_URL}/smartrooms`;
    const options = { };

    return this.httpClient.get<SmartRoom[]>(url, options);
  }

  /**
   * Get One Smart Room
   * @return Observable<SmartRoom>
   */
  public getSmartRoom(id: number): Observable<SmartRoom> {
    this.logger.debug('SmartRoomService', 'getSmartRoom', 'retrieving...');
    const url = `${this.BASE_URL}/smartrooms/${id}`;
    const options = { };

    return this.httpClient.get<SmartRoom>(url, options);
  }

  /**
   * Create smart room
   * @param smartRoom : SmartRoom
   * @return Observable<SmartRoom>
   */
  public createSmartRoom(smartRoom: SmartRoom): Observable<any> {
    this.logger.debug('SmartRoomService', 'createSmartRoom', 'request', smartRoom);
    const url = `${this.BASE_URL}/smartrooms`;
    return this.httpClient.post<any>(url, smartRoom, { });
  }

  /**
   * Update smart room
   * @param smartRoom : SmartRoom
   * @return Observable<SmartRoom>
   */
  public updateSmartRoom(smartRoom: SmartRoom): Observable<any> {
    this.logger.debug('SmartRoomService', 'updateSmartRoom', 'request', smartRoom);
    const url = `${this.BASE_URL}/smartrooms`;
    return this.httpClient.post<any>(url, smartRoom, { });
  }

  /**
   * Delte smart room
   * @param smartRoom : SmartRoom
   * @return Observable<any>
   */
  public deleteSmartRoom(id: number): Observable<any> {
    this.logger.debug('SmartRoomService', 'delteSmartRoom', 'request', id);
    const url = `${this.BASE_URL}/smartrooms/${id}`;
    return this.httpClient.delete<any>(url, { });
  }

}
