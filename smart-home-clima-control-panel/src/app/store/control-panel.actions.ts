import { createAction, props } from '@ngrx/store';
import { ControlPanel } from './../models/control-panel.model';

export enum ControlPanelActionTypes {
  START_MONITORING = '[ControlPanel] Start Monitoring',
  START_MONITORING_SUCCESS = '[ControlPanel] Start Monitoring Success',
  START_MONITORING_FAILURE = '[ControlPanel] Start Monitoring Failure',
  STOP_MONITORING = '[ControlPanel] Stop Monitoring',
  STOP_MONITORING_SUCCESS = '[ControlPanel] Stop Monitoring Success',
  STOP_MONITORING_FAILURE = '[ControlPanel] Stop Monitoring Failure',
  DATA_MONITORING_UPDATE = '[ControlPanel] Data Monitoring Update'
}

export const ControlPanelStartMonitoringAction = createAction(
  ControlPanelActionTypes.START_MONITORING
);

export const ControlPanelStartMonitoringSuccessAction = createAction(
  ControlPanelActionTypes.START_MONITORING_SUCCESS,
  props<{payload: ControlPanel}>()
);

export const ControlPanelStartMonitoringFailAction = createAction(
  ControlPanelActionTypes.START_MONITORING_FAILURE,
  props<any>()
);

export const ControlPanelStopMonitoringAction = createAction(
  ControlPanelActionTypes.STOP_MONITORING
);

export const ControlPanelStopMonitoringSuccessAction = createAction(
  ControlPanelActionTypes.STOP_MONITORING_SUCCESS,
  props<{payload: ControlPanel}>()
);

export const ControlPanelStopMonitoringFailureAction = createAction(
  ControlPanelActionTypes.STOP_MONITORING_FAILURE,
  props<any>()
);

export const ControlPanelUpdateAction = createAction(
  ControlPanelActionTypes.DATA_MONITORING_UPDATE,
  props<{payload: ControlPanel}>()
);
