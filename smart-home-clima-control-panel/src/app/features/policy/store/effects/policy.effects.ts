import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';


import { PolicyActionTypes } from 'src/app/features/policy/store/actions/policy.actions';
import { Policy, PolicyRequest } from 'src/app/models/policy.model';

import { PolicyService } from 'src/app/features/policy/services/policy.service';

@Injectable()
export class PolicyEffects {
    constructor(
        private actions: Actions,
        private policyService: PolicyService
    ) {}

    public loadPolicies = createEffect(() =>
        this.actions.pipe(
            ofType(PolicyActionTypes.LOADING),
            switchMap((payload) =>
                this.policyService.getPolicys(payload).pipe(
                    map(
                        (response: Policy[]) => ({ type: PolicyActionTypes.LOAD_SUCCESS, payload: response})
                    ),
                    catchError((error) => of({type: PolicyActionTypes.LOAD_FAILURE, payload: error}))
                )
            )
        )
    );

    public loadOne = createEffect(() => 
        this.actions.pipe(
            ofType(PolicyActionTypes.LOADONE),
            switchMap((params: any) =>
                this.policyService.getPolicy(params.id).pipe(
                    map((response: Policy) => {
                        return { type: PolicyActionTypes.LOADONE_SUCCESS, payload: response}
                    }),
                    catchError((error) => of({type: PolicyActionTypes.LOADONE_FAILURE, payload: error}))
                )
            )
        )
    );

    public createPolicy = createEffect(() => 
        this.actions.pipe(
            ofType(PolicyActionTypes.NEW),
            switchMap((params: PolicyRequest) =>
                this.policyService.createPolicy(params).pipe(
                    map((response: Policy) =>
                        ({ type: PolicyActionTypes.NEW_SUCCESS, payload: response})
                    ),
                    catchError((error) => of({type: PolicyActionTypes.NEW_FAILURE, payload: error}))
                )
            )
        )
    );

    public updatePolicy = createEffect(() => 
        this.actions.pipe(
            ofType(PolicyActionTypes.UPDATE),
            switchMap((request: PolicyRequest) =>
                this.policyService.updatePolicy(request).pipe(
                    map((response: any) => 
                        ({ type: PolicyActionTypes.UPDATE_SUCCESS, payload: response})
                    ),
                    catchError((error) => of({type: PolicyActionTypes.UPDATE_FAILURE, payload: error}))
                )
            )
        )
    );

    public updateSuccess = createEffect(() => 
        this.actions.pipe(
            ofType(PolicyActionTypes.UPDATE_SUCCESS),
            switchMap((request: PolicyRequest) => 
                this.policyService.getPolicy(request).pipe(
                    map((response: Policy) => ({ type: PolicyActionTypes.LOADONE_SUCCESS, payload: response})),
                    catchError((error) => of({type: PolicyActionTypes.UPDATE_FAILURE, payload: error}))
                )
            )
        )
    );


    public deleteSmartRoom = createEffect(() => 
        this.actions.pipe(
            ofType(PolicyActionTypes.DELETE),
            switchMap((param: PolicyRequest) =>
                this.policyService.deletePolicy(param).pipe(
                    map((response: any) => ({ type: PolicyActionTypes.DELETE_SUCCESS, payload: response})),
                    catchError((error) => of({type: PolicyActionTypes.DELETE_FAILURE, payload: error}))
                )
            )
        )
    );

}
