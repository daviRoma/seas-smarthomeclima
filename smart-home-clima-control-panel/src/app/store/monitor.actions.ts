import { createAction, props } from '@ngrx/store';
import { Monitor } from '../models/monitor.model';

export enum MonitorActionTypes {
  START_MONITORING = '[Monitor] Start Monitoring',
  START_MONITORING_SUCCESS = '[Monitor] Start Monitoring Success',
  START_MONITORING_FAILURE = '[Monitor] Start Monitoring Failure',
  STOP_MONITORING = '[Monitor] Stop Monitoring',
  STOP_MONITORING_SUCCESS = '[Monitor] Stop Monitoring Success',
  STOP_MONITORING_FAILURE = '[Monitor] Stop Monitoring Failure',
  DATA_MONITORING_UPDATE = '[Monitor] Data Monitoring Update'
}

export const MonitorStartMonitoringAction = createAction(
  MonitorActionTypes.START_MONITORING
);

export const MonitorStartMonitoringSuccessAction = createAction(
  MonitorActionTypes.START_MONITORING_SUCCESS,
  props<{payload: Monitor}>()
);

export const MonitorStartMonitoringFailAction = createAction(
  MonitorActionTypes.START_MONITORING_FAILURE,
  props<any>()
);

export const MonitorStopMonitoringAction = createAction(
  MonitorActionTypes.STOP_MONITORING
);

export const MonitorStopMonitoringSuccessAction = createAction(
  MonitorActionTypes.STOP_MONITORING_SUCCESS,
  props<{payload: Monitor}>()
);

export const MonitorStopMonitoringFailureAction = createAction(
  MonitorActionTypes.STOP_MONITORING_FAILURE,
  props<any>()
);

export const MonitorUpdateAction = createAction(
  MonitorActionTypes.DATA_MONITORING_UPDATE,
  props<{payload: Monitor}>()
);
