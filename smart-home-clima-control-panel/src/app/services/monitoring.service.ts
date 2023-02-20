import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';

import { serverConfiguration } from 'src/app/config/server.config';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  private BASE_URL = serverConfiguration.api;

  constructor(
    private logger: NGXLogger,
    private httpClient: HttpClient
  ) { }

  /**
   * Start monitoring process
   * @return Observable<any>
   */
  public startMonitoring(): Observable<any> {
    this.logger.debug('MonitoringService', 'startMonitoring', 'starting...');
    const url = `${this.BASE_URL}/monitoring/start`;

    return this.httpClient.get<any>(url, { });
  }

  /**
   * Stop monitoring process
   * @return Observable<any>
   */
  public stopMonitoring(): Observable<any> {
    this.logger.debug('MonitoringService', 'stopMonitoring', 'starting...');
    const url = `${this.BASE_URL}/monitoring/stop`;

    return this.httpClient.post<any>(url, null, { });
  }
}
