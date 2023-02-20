import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { PolicyGroupActionTypes } from 'src/app/features/policy-group/store/actions/policy-group.actions';
import { PolicyGroup, PolicyGroupRequest } from 'src/app/models/policy-group.model';

import { PolicyGroupService } from 'src/app/features/policy-group/services/policy-group.service';

@Injectable()
export class PolicyGroupEffects {
    constructor(
        private actions: Actions,
        private router: Router,
        private policyGroupService: PolicyGroupService
    ) {}

    public loadPolicyGroups = createEffect(() =>
        this.actions.pipe(
            ofType(PolicyGroupActionTypes.LOADING),
            switchMap((payload) =>
                this.policyGroupService.getPolicyGroups(payload).pipe(
                    map(
                        (response: PolicyGroup[]) => ({ type: PolicyGroupActionTypes.LOAD_SUCCESS, payload: response})
                    ),
                    catchError((error) => of({type: PolicyGroupActionTypes.LOAD_FAILURE, payload: error}))
                )
            )
        )
    );

    public loadOne = createEffect(() => 
        this.actions.pipe(
            ofType(PolicyGroupActionTypes.LOADONE),
            switchMap((params: any) =>
                this.policyGroupService.getPolicyGroup(params.id).pipe(
                    map((response: PolicyGroup) => {
                        return { type: PolicyGroupActionTypes.LOADONE_SUCCESS, payload: response}
                    }),
                    catchError((error) => of({type: PolicyGroupActionTypes.LOADONE_FAILURE, payload: error}))
                )
            )
        )
    );

    public createPolicyGroup = createEffect(() => 
        this.actions.pipe(
            ofType(PolicyGroupActionTypes.NEW),
            switchMap((params: PolicyGroupRequest) =>
                this.policyGroupService.createPolicyGroup(params).pipe(
                    map((response: PolicyGroup) =>
                        ({ type: PolicyGroupActionTypes.NEW_SUCCESS, payload: response})
                    ),
                    catchError((error) => of({type: PolicyGroupActionTypes.NEW_FAILURE, payload: error}))
                )
            )
        )
    );

    public updatePolicyGroup = createEffect(() => 
        this.actions.pipe(
            ofType(PolicyGroupActionTypes.UPDATE),
            switchMap((request: PolicyGroupRequest) =>
                this.policyGroupService.updatePolicyGroup(request).pipe(
                    map((response: any) => 
                        ({ type: PolicyGroupActionTypes.UPDATE_SUCCESS, payload: response})
                    ),
                    catchError((error) => of({type: PolicyGroupActionTypes.UPDATE_FAILURE, payload: error}))
                )
            )
        )
    );

    public updateSuccess = createEffect(() => 
        this.actions.pipe(
            ofType(PolicyGroupActionTypes.UPDATE_SUCCESS),
            switchMap((request: number) => 
                this.policyGroupService.getPolicyGroup(request).pipe(
                    map((response: PolicyGroup) => ({ type: PolicyGroupActionTypes.LOADONE_SUCCESS, payload: response})),
                    catchError((error) => of({type: PolicyGroupActionTypes.UPDATE_FAILURE, payload: error}))
                )
            )
        )
    );


    public deleteSmartRoom = createEffect(() => 
        this.actions.pipe(
            ofType(PolicyGroupActionTypes.DELETE),
            switchMap((param: PolicyGroupRequest) =>
                this.policyGroupService.deletePolicyGroup(param).pipe(
                    map((response: any) => ({ type: PolicyGroupActionTypes.DELETE_SUCCESS, payload: response})),
                    catchError((error) => of({type: PolicyGroupActionTypes.DELETE_FAILURE, payload: error}))
                )
            )
        )
    );

}
