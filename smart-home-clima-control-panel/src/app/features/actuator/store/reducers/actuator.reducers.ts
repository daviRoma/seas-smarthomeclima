import { ActuatorState, initialActuatorState, actuatorAdapter } from 'src/app/state/actuator.state';
import { createReducer, on } from '@ngrx/store';
import * as ActuatorActions from './../actions/actuator.actions';


export const actuatorReducer = createReducer(
  initialActuatorState,
  on(ActuatorActions.ActuatorLoadAction, state => ({ ...state, loading: true })),
  on(ActuatorActions.ActuatorLoadSuccessAction, 
    (state, action) => (
      actuatorAdapter.setAll( action.payload, {
        ...state,
        error: false,
        loading: false,
        total: action.payload ? action.payload.length : 0
      })
    )
  ),
  on(ActuatorActions.ActuatorLoadFailAction, state => (actuatorAdapter.removeAll({...state, error: true, loading: false, total: 0}))),
  on(ActuatorActions.ActuatorLoadOneAction, state => ({ ...state, loading: true })),
  on(ActuatorActions.ActuatorLoadOneSuccessAction, 
    (state, action) => (
      state.total ? actuatorAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        { ...state, loading: false, error: false, total: state.total }
      ) : actuatorAdapter.setOne(action.payload, { ...state, loading: false, error: false, total: 1 })
    )
  ),
  on(ActuatorActions.ActuatorNewAction, state => ( { ...state, loading: true })),
  on(ActuatorActions.ActuatorNewFailureAction, state => ({ ...state, loading: false, error: true, total: state.total })),
  on(ActuatorActions.ActuatorUpdateAction, state => ( { ...state, loading: true })),
  on(ActuatorActions.ActuatorUpdateFailureAction, state => ( { ...state, loading: false, error: true, total: state.total })),
  on(ActuatorActions.ActuatorDeleteAction, state => ( { ...state, loading: true })),
  on(ActuatorActions.ActuatorDeleteSuccesAction, 
    (state, action) => (
      actuatorAdapter.removeOne(action.id, { ...state, loading: false, error: false, total: (state.total > 0  ? state.total - 1 : 0)})
    )
  ),
  on(ActuatorActions.ActuatorDeleteFailuerAction, 
    state => (
      actuatorAdapter.setAll([], {...state, error: true, loading: false, total: 0})
    )
  )
);
