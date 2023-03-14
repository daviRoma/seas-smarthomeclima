import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { serverConfiguration } from 'src/app/config/server.config';

import { Policy, PolicyRequest } from 'src/app/models/policy.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private BASE_URL = serverConfiguration.api;

  constructor(
    private logger: NGXLogger,
    private httpClient: HttpClient
  ) {}

  /**
   * Get All policy by smartRoomId
   * @param smartRoomId : string
   */
  public getPolicys(request: PolicyRequest): Observable<Policy[]> {
    this.logger.debug('PolicyService', 'getPolicys', 'retrieving...');
    const url = `${this.BASE_URL}/policy_groups/${request.policyGroupId}/policies`;
    const options = { };

    return this.httpClient.get<Policy[]>(url, options);
  }

  /**
   * Get policy by smartRoomId and policyId
   * @param request : Policy
   */
  public getPolicy(request: PolicyRequest): Observable<Policy> {
    this.logger.debug('PolicyService', 'getPolicy', 'retrieving one...');
    const url = `${this.BASE_URL}/policies/${request.policyGroupId}`;
    return this.httpClient.get<Policy>(url, { });
  }

  /**
   * Create new policy 
   * @param request : PolicyRequest
   */
  public createPolicy(request: PolicyRequest): Observable<any> {
    this.logger.debug('PolicyService', 'createPolicy', request);
    const url = `${this.BASE_URL}/policies`;
    return this.httpClient.post<any>(url, request, { });
  }

  /**
   * Update policy 
   * @param request : PolicyRequest
   */
  public updatePolicy(request: PolicyRequest): Observable<any> {
    this.logger.debug('PolicyService', 'updatePolicy', request);
    const url = `${this.BASE_URL}/policies`;
    return this.httpClient.put<any>(url, request, { });
  }

  /**
   * Delete policy  by id
   * @param request : PolicyRequest
   */
  public deletePolicy(request: PolicyRequest): Observable<any> {
    this.logger.debug('PolicyService', 'deletePolicy', request);
    const url = `${this.BASE_URL}/policies`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: request
    };
    return this.httpClient.delete<any>(url, options);
  }

}