import { createAction, props } from '@ngrx/store';
import { SmartRoom } from 'src/app/models/smart-room.model';

export enum SmartRoomActionTypes {
  LOADING = '[SmartRoom] Loading',
  LOAD_SUCCESS = '[SmartRoom] Loading Success',
  LOAD_FAILURE = '[SmartRoom] Loading Failure',
  LOADONE = '[SmartRoom] Loadone',
  LOADONE_REDIRECT = '[SmartRoom] Loadone Redirect',
  LOADONE_SUCCESS = '[SmartRoom] Loadone Success',
  LOADONE_FAILURE = '[SmartRoom] Loadone Failure',
  NEW = '[SmartRoom] New',
  NEW_SUCCESS = '[SmartRoom] New Success',
  NEW_FAILURE = '[SmartRoom] New Failure',
  UPDATE = '[SmartRoom] Update',
  UPDATE_SUCCESS = '[SmartRoom] Update Success',
  UPDATE_FAILURE = '[SmartRoom] Update Failure',
  UPDATE_MANUALLY = '[SmartRoom] Update Manually',
  DELETE = '[SmartRoom] Delete',
  DELETE_SUCCESS = '[SmartRoom] Delete Success',
  DELETE_FAILURE = '[SmartRoom] Delete Failure'
}

export const SmartRoomLoadAction = createAction(
  SmartRoomActionTypes.LOADING
);

export const SmartRoomLoadSuccessAction = createAction(
  SmartRoomActionTypes.LOAD_SUCCESS,
  props<{payload: SmartRoom[]}>()
);

export const SmartRoomLoadFailAction = createAction(
  SmartRoomActionTypes.LOAD_FAILURE,
  props<any>()
);

export const SmartRoomLoadOneAction = createAction(
  SmartRoomActionTypes.LOADONE,
  props<any>()
);

export const SmartRoomLoadOneRedirectAction = createAction(
  SmartRoomActionTypes.LOADONE_REDIRECT,
  props<{payload: SmartRoom}>()
);

export const SmartRoomLoadOneSuccessAction = createAction(
  SmartRoomActionTypes.LOADONE_SUCCESS,
  props<{payload: SmartRoom}>()
);

export const SmartRoomLoadOneFailureAction = createAction(
  SmartRoomActionTypes.LOADONE_FAILURE,
  props<any>()
);

export const SmartRoomNewAction = createAction(
  SmartRoomActionTypes.NEW,
  props<{payload: SmartRoom}>()
);

export const SmartRoomNewSuccessAction = createAction(
  SmartRoomActionTypes.NEW_SUCCESS,
  props<{payload: SmartRoom}>()
);

export const SmartRoomNewFailureAction = createAction(
  SmartRoomActionTypes.NEW_FAILURE,
  props<{error: any}>()
);

export const SmartRoomUpdateAction = createAction(
  SmartRoomActionTypes.UPDATE,
  props<SmartRoom>()
);

export const SmartRoomUpdateFailureAction = createAction(
  SmartRoomActionTypes.UPDATE_FAILURE,
  props<{error: any}>()
);

export const SmartRoomUpdateManuallyAction = createAction(
  SmartRoomActionTypes.UPDATE_MANUALLY,
  props<{payload: SmartRoom}>()
);

export const SmartRoomDeleteAction = createAction(
  SmartRoomActionTypes.DELETE,
  props<{id: number}>()
);

export const SmartRoomDeleteSuccesAction = createAction(
  SmartRoomActionTypes.DELETE_SUCCESS,
  props<{id: number}>()
);

export const SmartRoomDeleteFailuerAction = createAction(
  SmartRoomActionTypes.DELETE_FAILURE,
  props<{error: any}>()
);
