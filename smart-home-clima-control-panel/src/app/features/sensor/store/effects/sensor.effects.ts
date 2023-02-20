import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { SensorActionTypes } from 'src/app/features/sensor/store/actions/sensor.actions';
import { Sensor, SensorRequest } from 'src/app/models/sensor.model';

import { SensorService } from 'src/app/features/sensor/services/sensor.service';

@Injectable()
export class SensorEffects {
    constructor(
        private actions: Actions,
        private sensorService: SensorService
    ) {}

    public loadSensors = createEffect(() =>
        this.actions.pipe(
            ofType(SensorActionTypes.LOADING),
            switchMap((payload) =>
                this.sensorService.getSensors(payload).pipe(
                    map(
                        (response: Sensor[]) => ({ type: SensorActionTypes.LOAD_SUCCESS, payload: response})
                    ),
                    catchError((error) => of({type: SensorActionTypes.LOAD_FAILURE, payload: error}))
                )
            )
        )
    );

    public loadOne = createEffect(() => 
        this.actions.pipe(
            ofType(SensorActionTypes.LOADONE),
            switchMap((params: any) =>
                this.sensorService.getSensor(params.id).pipe(
                    map((response: Sensor) => {
                        return { type: SensorActionTypes.LOADONE_SUCCESS, payload: response}
                    }),
                    catchError((error) => of({type: SensorActionTypes.LOADONE_FAILURE, payload: error}))
                )
            )
        )
    );

    public createSensor = createEffect(() => 
        this.actions.pipe(
            ofType(SensorActionTypes.NEW),
            switchMap((params: SensorRequest) =>
                this.sensorService.createSensor(params).pipe(
                    map((response: Sensor) =>
                        ({ type: SensorActionTypes.NEW_SUCCESS, payload: response})
                    ),
                    catchError((error) => of({type: SensorActionTypes.NEW_FAILURE, payload: error}))
                )
            )
        )
    );

    public updateSensor = createEffect(() => 
        this.actions.pipe(
            ofType(SensorActionTypes.UPDATE),
            switchMap((request: SensorRequest) =>
                this.sensorService.updateSensor(request).pipe(
                    map((response: any) => 
                        ({ type: SensorActionTypes.UPDATE_SUCCESS, payload: response})
                    ),
                    catchError((error) => of({type: SensorActionTypes.UPDATE_FAILURE, payload: error}))
                )
            )
        )
    );

    public updateSuccess = createEffect(() => 
        this.actions.pipe(
            ofType(SensorActionTypes.UPDATE_SUCCESS),
            switchMap((request: number) => 
                this.sensorService.getSensor(request).pipe(
                    map((response: Sensor) => ({ type: SensorActionTypes.LOADONE_SUCCESS, payload: response})),
                    catchError((error) => of({type: SensorActionTypes.UPDATE_FAILURE, payload: error}))
                )
            )
        )
    );


    public deleteSmartRoom = createEffect(() => 
        this.actions.pipe(
            ofType(SensorActionTypes.DELETE),
            switchMap((param: SensorRequest) =>
                this.sensorService.deleteSensor(param).pipe(
                    map((response: any) => ({ type: SensorActionTypes.DELETE_SUCCESS, payload: response})),
                    catchError((error) => of({type: SensorActionTypes.DELETE_FAILURE, payload: error}))
                )
            )
        )
    );

}
