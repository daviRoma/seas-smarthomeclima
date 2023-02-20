import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { serverConfiguration } from 'src/app/config/server.config';

import { PolicyGroup, PolicyGroupRequest } from 'src/app/models/policy-group.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyGroupService {
  private BASE_URL = serverConfiguration.api;

  constructor(
    private logger: NGXLogger,
    private httpClient: HttpClient
  ) {}

  /**
   * Get All policy group by smartRoomId
   * @param smartRoomId : string
   */
  public getPolicyGroups(smartRoomId: number): Observable<PolicyGroup[]> {
    this.logger.debug('PolicyGroupService', 'getPolicyGroups', 'retrieving...');
    const url = `${this.BASE_URL}/smartrooms/${smartRoomId}/policy_groups`;
    const options = { };

    return this.httpClient.get<any>(url, options);
  }

  /**
   * Get policy group by smartRoomId and policyGroupId
   * @param request : PolicyGroup
   */
  public getPolicyGroup(policyGroupId: number): Observable<PolicyGroup> {
    this.logger.debug('PolicyGroupService', 'getPolicyGroup', 'retrieving one...');
    const url = `${this.BASE_URL}/policy_groups/${policyGroupId}`;
    return this.httpClient.get<PolicyGroup>(url, { });
  }

  /**
   * Create new policy group
   * @param request : PolicyGroup
   */
  public createPolicyGroup(request: PolicyGroupRequest): Observable<any> {
    this.logger.debug('PolicyGroupService', 'createPolicyGroup', request);
    const url = `${this.BASE_URL}/policy_groups`;
    return this.httpClient.post<any>(url, request, { });
  }

  /**
   * Update policy group
   * @param request : PolicyGroupRequest
   */
  public updatePolicyGroup(request: PolicyGroupRequest): Observable<any> {
    this.logger.debug('PolicyGroupService', 'updatePolicyGroup', request);
    const url = `${this.BASE_URL}/policy_groups`;
    return this.httpClient.put<any>(url, request, { });
  }

  /**
   * Delete policy group by id
   * @param request : PolicyGroupRequest
   */
  public deletePolicyGroup(request: PolicyGroupRequest): Observable<any> {
    this.logger.debug('PolicyGroupService', 'deletePolicyGroup', request.policyGroup.id);
    const url = `${this.BASE_URL}/policy_groups/${request.policyGroup.id}`;
    return this.httpClient.delete<any>(url, { });
  }

}