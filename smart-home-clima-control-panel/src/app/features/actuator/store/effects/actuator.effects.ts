import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { ActuatorActionTypes } from 'src/app/features/actuator/store/actions/actuator.actions';
import { Actuator, ActuatorRequest } from 'src/app/models/actuator.model';

import { ActuatorService } from 'src/app/features/actuator/services/actuator.service';

@Injectable()
export class ActuatorEffects {
    constructor(
        private actions: Actions,
        private actuatorService: ActuatorService
    ) {}

    public loadActuators = createEffect(() =>
        this.actions.pipe(
            ofType(ActuatorActionTypes.LOADING),
            switchMap((payload) =>
                this.actuatorService.getActuators(payload).pipe(
                    map(
                        (response: Actuator[]) => ({ type: ActuatorActionTypes.LOAD_SUCCESS, payload: response})
                    ),
                    catchError((error) => of({type: ActuatorActionTypes.LOAD_FAILURE, payload: error}))
                )
            )
        )
    );

    public loadOne = createEffect(() => 
        this.actions.pipe(
            ofType(ActuatorActionTypes.LOADONE),
            switchMap((param: number) =>
                this.actuatorService.getActuator(param).pipe(
                    map((response: Actuator) => {
                        return { type: ActuatorActionTypes.LOADONE_SUCCESS, payload: response}
                    }),
                    catchError((error) => of({type: ActuatorActionTypes.LOADONE_FAILURE, payload: error}))
                )
            )
        )
    );

    public createActuator = createEffect(() => 
        this.actions.pipe(
            ofType(ActuatorActionTypes.NEW),
            switchMap((params: ActuatorRequest) =>
                this.actuatorService.createActuator(params).pipe(
                    map((response: Actuator) =>
                        ({ type: ActuatorActionTypes.NEW_SUCCESS, payload: response})
                    ),
                    catchError((error) => of({type: ActuatorActionTypes.NEW_FAILURE, payload: error}))
                )
            )
        )
    );

    public updateActuator = createEffect(() => 
        this.actions.pipe(
            ofType(ActuatorActionTypes.UPDATE),
            switchMap((request: ActuatorRequest) =>
                this.actuatorService.updateActuator(request).pipe(
                    map((response: any) => 
                        ({ type: ActuatorActionTypes.UPDATE_SUCCESS, payload: response})
                    ),
                    catchError((error) => of({type: ActuatorActionTypes.UPDATE_FAILURE, payload: error}))
                )
            )
        )
    );

    public updateSuccess = createEffect(() => 
        this.actions.pipe(
            ofType(ActuatorActionTypes.UPDATE_SUCCESS),
            switchMap((request: number) => 
                this.actuatorService.getActuator(request).pipe(
                    map((response: Actuator) => ({ type: ActuatorActionTypes.LOADONE_SUCCESS, payload: response})),
                    catchError((error) => of({type: ActuatorActionTypes.UPDATE_FAILURE, payload: error}))
                )
            )
        )
    );


    public deleteSmartRoom = createEffect(() => 
        this.actions.pipe(
            ofType(ActuatorActionTypes.DELETE),
            switchMap((param: ActuatorRequest) =>
                this.actuatorService.deleteActuator(param).pipe(
                    map((response: any) => ({ type: ActuatorActionTypes.DELETE_SUCCESS, payload: response})),
                    catchError((error) => of({type: ActuatorActionTypes.DELETE_FAILURE, payload: error}))
                )
            )
        )
    );

}
