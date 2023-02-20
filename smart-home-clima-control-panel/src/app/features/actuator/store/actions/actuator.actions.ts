import { createAction, props } from '@ngrx/store';
import { Actuator, ActuatorRequest } from 'src/app/models/actuator.model';

export enum ActuatorActionTypes {
  LOADING = '[Actuator] Loading',
  LOAD_SUCCESS = '[Actuator] Loading Success',
  LOAD_FAILURE = '[Actuator] Loading Failure',
  LOADONE = '[Actuator] Loadone',
  LOADONE_SUCCESS = '[Actuator] Loadone Success',
  LOADONE_FAILURE = '[Actuator] Loadone Failure',
  NEW = '[Actuator] New',
  NEW_SUCCESS = '[Actuator] New Success',
  NEW_FAILURE = '[Actuator] New Failure',
  UPDATE = '[Actuator] Update',
  UPDATE_SUCCESS = '[Actuator] Update Success',
  UPDATE_FAILURE = '[Actuator] Update Failure',
  DELETE = '[Actuator] Delete',
  DELETE_SUCCESS = '[Actuator] Delete Success',
  DELETE_FAILURE = '[Actuator] Delete Failure'
}

export const ActuatorLoadAction = createAction(
  ActuatorActionTypes.LOADING,
  props<{payload: number}>()
);

export const ActuatorLoadSuccessAction = createAction(
  ActuatorActionTypes.LOAD_SUCCESS,
  props<{payload: Actuator[]}>()
);

export const ActuatorLoadFailAction = createAction(
  ActuatorActionTypes.LOAD_FAILURE,
  props<any>()
);

export const ActuatorLoadOneAction = createAction(
  ActuatorActionTypes.LOADONE,
  props<{payload: number}>()
);

export const ActuatorLoadOneSuccessAction = createAction(
  ActuatorActionTypes.LOADONE_SUCCESS,
  props<{payload: Actuator}>()
);

export const ActuatorLoadOneFailureAction = createAction(
  ActuatorActionTypes.LOADONE_FAILURE,
  props<any>()
);

export const ActuatorNewAction = createAction(
  ActuatorActionTypes.NEW,
  props<{payload: ActuatorRequest}>()
);

export const ActuatorNewSuccessAction = createAction(
  ActuatorActionTypes.NEW_SUCCESS,
  props<{payload: Actuator}>()
);

export const ActuatorNewFailureAction = createAction(
  ActuatorActionTypes.NEW_FAILURE,
  props<{error: any}>()
);

export const ActuatorUpdateAction = createAction(
  ActuatorActionTypes.UPDATE,
  props<{payload: ActuatorRequest}>()
);

export const ActuatorUpdateFailureAction = createAction(
  ActuatorActionTypes.UPDATE_FAILURE,
  props<{error: any}>()
);

export const ActuatorDeleteAction = createAction(
  ActuatorActionTypes.DELETE,
  props<{payload: ActuatorRequest}>()
);

export const ActuatorDeleteSuccesAction = createAction(
  ActuatorActionTypes.DELETE_SUCCESS,
  props<{id: number}>()
);

export const ActuatorDeleteFailuerAction = createAction(
  ActuatorActionTypes.DELETE_FAILURE,
  props<{error: any}>()
);
