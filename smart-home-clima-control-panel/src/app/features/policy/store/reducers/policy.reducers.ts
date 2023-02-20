import { PolicyState, initialPolicyState, policyAdapter } from 'src/app/state/policy.state';
import { createReducer, on } from '@ngrx/store';
import * as PolicyActions from './../actions/policy.actions';


export const policyReducer = createReducer(
  initialPolicyState,
  on(PolicyActions.PolicyLoadAction, state => ({ ...state, loading: true })),
  on(PolicyActions.PolicyLoadSuccessAction, 
    (state, action) => (
      policyAdapter.setAll( action.payload, {
        ...state,
        error: false,
        loading: false,
        total: action.payload ? action.payload.length : 0
      })
    )
  ),
  on(PolicyActions.PolicyLoadFailAction, state => (policyAdapter.removeAll({...state, error: true, loading: false, total: 0}))),
  on(PolicyActions.PolicyLoadOneAction, state => ({ ...state, loading: true })),
  on(PolicyActions.PolicyLoadOneSuccessAction, 
    (state, action) => (
      state.total ? policyAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        { ...state, loading: false, error: false, total: state.total }
      ) : policyAdapter.setOne(action.payload, { ...state, loading: false, error: false, total: 1 })
    )
  ),
  on(PolicyActions.PolicyNewAction, state => ( { ...state, loading: true })),
  on(PolicyActions.PolicyNewFailureAction, state => ({ ...state, loading: false, error: true, total: state.total })),
  on(PolicyActions.PolicyUpdateAction, state => ( { ...state, loading: true })),
  on(PolicyActions.PolicyUpdateFailureAction, state => ( { ...state, loading: false, error: true, total: state.total })),
  on(PolicyActions.PolicyDeleteAction, state => ( { ...state, loading: true })),
  on(PolicyActions.PolicyDeleteSuccesAction, 
    (state, action) => (
      policyAdapter.removeOne(action.id, { ...state, loading: false, error: false, total: (state.total > 0  ? state.total - 1 : 0)})
    )
  ),
  on(PolicyActions.PolicyDeleteFailuerAction, 
    state => (
      policyAdapter.setAll([], {...state, error: true, loading: false, total: 0})
    )
  )
);
