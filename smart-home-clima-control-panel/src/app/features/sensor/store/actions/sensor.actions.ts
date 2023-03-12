import { createAction, props } from '@ngrx/store';
import { Sensor, SensorRequest } from 'src/app/models/sensor.model';

export enum SensorActionTypes {
  LOADING = '[Sensor] Loading',
  LOAD_SUCCESS = '[Sensor] Loading Success',
  LOAD_FAILURE = '[Sensor] Loading Failure',
  LOADONE = '[Sensor] Loadone',
  LOADONE_SUCCESS = '[Sensor] Loadone Success',
  LOADONE_FAILURE = '[Sensor] Loadone Failure',
  NEW = '[Sensor] New',
  NEW_SUCCESS = '[Sensor] New Success',
  NEW_FAILURE = '[Sensor] New Failure',
  UPDATE = '[Sensor] Update',
  UPDATE_SUCCESS = '[Sensor] Update Success',
  UPDATE_FAILURE = '[Sensor] Update Failure',
  DELETE = '[Sensor] Delete',
  DELETE_SUCCESS = '[Sensor] Delete Success',
  DELETE_FAILURE = '[Sensor] Delete Failure'
}

export const SensorLoadAction = createAction(
  SensorActionTypes.LOADING,
  props<{payload: number}>()
);

export const SensorLoadSuccessAction = createAction(
  SensorActionTypes.LOAD_SUCCESS,
  props<{payload: Sensor[]}>()
);

export const SensorLoadFailAction = createAction(
  SensorActionTypes.LOAD_FAILURE,
  props<any>()
);

export const SensorLoadOneAction = createAction(
  SensorActionTypes.LOADONE,
  props<any>()
);

export const SensorLoadOneSuccessAction = createAction(
  SensorActionTypes.LOADONE_SUCCESS,
  props<{payload: Sensor}>()
);

export const SensorLoadOneFailureAction = createAction(
  SensorActionTypes.LOADONE_FAILURE,
  props<any>()
);

export const SensorNewAction = createAction(
  SensorActionTypes.NEW,
  props<SensorRequest>()
);

export const SensorNewSuccessAction = createAction(
  SensorActionTypes.NEW_SUCCESS,
  props<{payload: Sensor}>()
);

export const SensorNewFailureAction = createAction(
  SensorActionTypes.NEW_FAILURE,
  props<{error: any}>()
);

export const SensorUpdateAction = createAction(
  SensorActionTypes.UPDATE,
  props<SensorRequest>()
);

export const SensorUpdateFailureAction = createAction(
  SensorActionTypes.UPDATE_FAILURE,
  props<{error: any}>()
);

export const SensorDeleteAction = createAction(
  SensorActionTypes.DELETE,
  props<SensorRequest>()
);

export const SensorDeleteSuccesAction = createAction(
  SensorActionTypes.DELETE_SUCCESS,
  props<{id: number}>()
);

export const SensorDeleteFailuerAction = createAction(
  SensorActionTypes.DELETE_FAILURE,
  props<{error: any}>()
);
