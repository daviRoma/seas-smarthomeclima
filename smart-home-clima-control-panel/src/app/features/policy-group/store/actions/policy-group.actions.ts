import { createAction, props } from '@ngrx/store';
import { PolicyGroup, PolicyGroupRequest } from 'src/app/models/policy-group.model';

export enum PolicyGroupActionTypes {
  LOADING = '[PolicyGroup] Loading',
  LOAD_SUCCESS = '[PolicyGroup] Loading Success',
  LOAD_FAILURE = '[PolicyGroup] Loading Failure',
  LOADONE = '[PolicyGroup] Loadone',
  LOADONE_SUCCESS = '[PolicyGroup] Loadone Success',
  LOADONE_FAILURE = '[PolicyGroup] Loadone Failure',
  NEW = '[PolicyGroup] New',
  NEW_SUCCESS = '[PolicyGroup] New Success',
  NEW_FAILURE = '[PolicyGroup] New Failure',
  UPDATE = '[PolicyGroup] Update',
  UPDATE_SUCCESS = '[PolicyGroup] Update Success',
  UPDATE_FAILURE = '[PolicyGroup] Update Failure',
  DELETE = '[PolicyGroup] Delete',
  DELETE_SUCCESS = '[PolicyGroup] Delete Success',
  DELETE_FAILURE = '[PolicyGroup] Delete Failure'
}

export const PolicyGroupLoadAction = createAction(
  PolicyGroupActionTypes.LOADING,
  props<{payload: number}>()
);

export const PolicyGroupLoadSuccessAction = createAction(
  PolicyGroupActionTypes.LOAD_SUCCESS,
  props<{payload: PolicyGroup[]}>()
);

export const PolicyGroupLoadFailAction = createAction(
  PolicyGroupActionTypes.LOAD_FAILURE,
  props<any>()
);

export const PolicyGroupLoadOneAction = createAction(
  PolicyGroupActionTypes.LOADONE,
  props<any>()
);

export const PolicyGroupLoadOneSuccessAction = createAction(
  PolicyGroupActionTypes.LOADONE_SUCCESS,
  props<{payload: PolicyGroup}>()
);

export const PolicyGroupLoadOneFailureAction = createAction(
  PolicyGroupActionTypes.LOADONE_FAILURE,
  props<any>()
);

export const PolicyGroupNewAction = createAction(
  PolicyGroupActionTypes.NEW,
  props<PolicyGroupRequest>()
);

export const PolicyGroupNewSuccessAction = createAction(
  PolicyGroupActionTypes.NEW_SUCCESS,
  props<{payload: PolicyGroup}>()
);

export const PolicyGroupNewFailureAction = createAction(
  PolicyGroupActionTypes.NEW_FAILURE,
  props<{error: any}>()
);

export const PolicyGroupUpdateAction = createAction(
  PolicyGroupActionTypes.UPDATE,
  props<PolicyGroupRequest>()
);

export const PolicyGroupUpdateFailureAction = createAction(
  PolicyGroupActionTypes.UPDATE_FAILURE,
  props<{error: any}>()
);

export const PolicyGroupDeleteAction = createAction(
  PolicyGroupActionTypes.DELETE,
  props<PolicyGroupRequest>()
);

export const PolicyGroupDeleteSuccesAction = createAction(
  PolicyGroupActionTypes.DELETE_SUCCESS,
  props<{id: number}>()
);

export const PolicyGroupDeleteFailuerAction = createAction(
  PolicyGroupActionTypes.DELETE_FAILURE,
  props<{error: any}>()
);
