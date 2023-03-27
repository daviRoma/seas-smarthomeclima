import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { MonitoringService } from 'src/app/services/monitoring.service';

import { MonitorActionTypes } from 'src/app/store/monitor.actions';
import { Monitor } from '../models/monitor.model';

@Injectable()
export class MonitorEffects {
    constructor(
        private actions: Actions,
        private monitoringService: MonitoringService
    ) {}

    public startMonitoring = createEffect(() =>
        this.actions.pipe(
            ofType(MonitorActionTypes.START_MONITORING),
            switchMap(() =>
                this.monitoringService.startMonitoring().pipe(
                    map(
                        (response: any) => ({ type: MonitorActionTypes.START_MONITORING_SUCCESS, payload: { id: 1, isStarted: true, channels: [] } as Monitor})
                    ),
                    catchError((error) => of({type: MonitorActionTypes.START_MONITORING_FAILURE, payload: error}))
                )
            )
        )
    );

    public stopMonitoring = createEffect(() =>
        this.actions.pipe(
            ofType(MonitorActionTypes.STOP_MONITORING),
            switchMap(() =>
                this.monitoringService.stopMonitoring().pipe(
                    map(
                        (response: any) => ({ type: MonitorActionTypes.STOP_MONITORING_SUCCESS, payload: { id: 1, isStarted: false, channels: [] } as Monitor})
                    ),
                    catchError((error) => of({type: MonitorActionTypes.STOP_MONITORING_FAILURE, payload: error}))
                )
            )
        )
    );

}
