import { createAction, props } from '@ngrx/store';
import { Policy, PolicyRequest } from 'src/app/models/policy.model';

export enum PolicyActionTypes {
  LOADING = '[Policy] Loading',
  LOAD_SUCCESS = '[Policy] Loading Success',
  LOAD_FAILURE = '[Policy] Loading Failure',
  LOADONE = '[Policy] Loadone',
  LOADONE_SUCCESS = '[Policy] Loadone Success',
  LOADONE_FAILURE = '[Policy] Loadone Failure',
  NEW = '[Policy] New',
  NEW_SUCCESS = '[Policy] New Success',
  NEW_FAILURE = '[Policy] New Failure',
  UPDATE = '[Policy] Update',
  UPDATE_SUCCESS = '[Policy] Update Success',
  UPDATE_FAILURE = '[Policy] Update Failure',
  DELETE = '[Policy] Delete',
  DELETE_SUCCESS = '[Policy] Delete Success',
  DELETE_FAILURE = '[Policy] Delete Failure'
}

export const PolicyLoadAction = createAction(
  PolicyActionTypes.LOADING,
  props<{payload: PolicyRequest}>()
);

export const PolicyLoadSuccessAction = createAction(
  PolicyActionTypes.LOAD_SUCCESS,
  props<{payload: Policy[]}>()
);

export const PolicyLoadFailAction = createAction(
  PolicyActionTypes.LOAD_FAILURE,
  props<any>()
);

export const PolicyLoadOneAction = createAction(
  PolicyActionTypes.LOADONE,
  props<any>()
);

export const PolicyLoadOneSuccessAction = createAction(
  PolicyActionTypes.LOADONE_SUCCESS,
  props<{payload: Policy}>()
);

export const PolicyLoadOneFailureAction = createAction(
  PolicyActionTypes.LOADONE_FAILURE,
  props<any>()
);

export const PolicyNewAction = createAction(
  PolicyActionTypes.NEW,
  props<PolicyRequest>()
);

export const PolicyNewSuccessAction = createAction(
  PolicyActionTypes.NEW_SUCCESS,
  props<{payload: Policy}>()
);

export const PolicyNewFailureAction = createAction(
  PolicyActionTypes.NEW_FAILURE,
  props<{error: any}>()
);

export const PolicyUpdateAction = createAction(
  PolicyActionTypes.UPDATE,
  props<PolicyRequest>()
);

export const PolicyUpdateFailureAction = createAction(
  PolicyActionTypes.UPDATE_FAILURE,
  props<{error: any}>()
);

export const PolicyDeleteAction = createAction(
  PolicyActionTypes.DELETE,
  props<PolicyRequest>()
);

export const PolicyDeleteSuccesAction = createAction(
  PolicyActionTypes.DELETE_SUCCESS,
  props<{id: number}>()
);

export const PolicyDeleteFailuerAction = createAction(
  PolicyActionTypes.DELETE_FAILURE,
  props<{error: any}>()
);
