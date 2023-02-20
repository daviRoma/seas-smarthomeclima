import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { MonitoringService } from 'src/app/services/monitoring.service';

import { ControlPanelActionTypes } from 'src/app/store/control-panel.actions';
import { ControlPanel } from '../models/control-panel.model';

@Injectable()
export class ControlPanelEffects {
    constructor(
        private actions: Actions,
        private monitoringService: MonitoringService
    ) {}

    public startMonitoring = createEffect(() =>
        this.actions.pipe(
            ofType(ControlPanelActionTypes.START_MONITORING),
            switchMap(() =>
                this.monitoringService.startMonitoring().pipe(
                    map(
                        (response: any) => ({ type: ControlPanelActionTypes.START_MONITORING_SUCCESS, payload: { id: 1, isStarted: true, channels: [] } as ControlPanel})
                    ),
                    catchError((error) => of({type: ControlPanelActionTypes.START_MONITORING_FAILURE, payload: error}))
                )
            )
        )
    );

    public stopMonitoring = createEffect(() =>
        this.actions.pipe(
            ofType(ControlPanelActionTypes.STOP_MONITORING),
            switchMap(() =>
                this.monitoringService.startMonitoring().pipe(
                    map(
                        (response: any) => ({ type: ControlPanelActionTypes.STOP_MONITORING, payload: { id: 1, isStarted: false, channels: [] } as ControlPanel})
                    ),
                    catchError((error) => of({type: ControlPanelActionTypes.STOP_MONITORING, payload: error}))
                )
            )
        )
    );

}
