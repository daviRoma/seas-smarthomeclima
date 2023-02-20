import { PolicyGroupState, initialPolicyGroupState, policyGroupAdapter } from 'src/app/state/policy-group.state';
import { createReducer, on } from '@ngrx/store';
import * as PolicyGroupActions from './../actions/policy-group.actions';


export const policyGroupReducer = createReducer(
  initialPolicyGroupState,
  on(PolicyGroupActions.PolicyGroupLoadAction, state => ({ ...state, loading: true })),
  on(PolicyGroupActions.PolicyGroupLoadSuccessAction, 
    (state, action) => (
      policyGroupAdapter.setAll( action.payload, {
        ...state,
        error: false,
        loading: false,
        total: action.payload ? action.payload.length : 0
      })
    )
  ),
  on(PolicyGroupActions.PolicyGroupLoadFailAction, state => (policyGroupAdapter.removeAll({...state, error: true, loading: false, total: 0}))),
  on(PolicyGroupActions.PolicyGroupLoadOneAction, state => ({ ...state, loading: true })),
  on(PolicyGroupActions.PolicyGroupLoadOneSuccessAction, 
    (state, action) => (
      state.total ? policyGroupAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        { ...state, loading: false, error: false, total: state.total }
      ) : policyGroupAdapter.setOne(action.payload, { ...state, loading: false, error: false, total: 1 })
    )
  ),
  on(PolicyGroupActions.PolicyGroupNewAction, state => ( { ...state, loading: true })),
  on(PolicyGroupActions.PolicyGroupNewFailureAction, state => ({ ...state, loading: false, error: true, total: state.total })),
  on(PolicyGroupActions.PolicyGroupUpdateAction, state => ( { ...state, loading: true })),
  on(PolicyGroupActions.PolicyGroupUpdateFailureAction, state => ( { ...state, loading: false, error: true, total: state.total })),
  on(PolicyGroupActions.PolicyGroupDeleteAction, state => ( { ...state, loading: true })),
  on(PolicyGroupActions.PolicyGroupDeleteSuccesAction, 
    (state, action) => (
      policyGroupAdapter.removeOne(action.id, { ...state, loading: false, error: false, total: (state.total > 0  ? state.total - 1 : 0)})
    )
  ),
  on(PolicyGroupActions.PolicyGroupDeleteFailuerAction, 
    state => (
      policyGroupAdapter.setAll([], {...state, error: true, loading: false, total: 0})
    )
  )
);
