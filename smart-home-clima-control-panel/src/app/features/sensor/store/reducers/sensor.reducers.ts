import { SensorState, initialSensorState, sensorAdapter } from 'src/app/state/sensor.state';
import { createReducer, on } from '@ngrx/store';
import * as SensorActions from './../actions/sensor.actions';


export const sensorReducer = createReducer(
  initialSensorState,
  on(SensorActions.SensorLoadAction, state => ({ ...state, loading: true })),
  on(SensorActions.SensorLoadSuccessAction, 
    (state, action) => (
      sensorAdapter.setAll( action.payload, {
        ...state,
        error: false,
        loading: false,
        total: action.payload ? action.payload.length : 0
      })
    )
  ),
  on(SensorActions.SensorLoadFailAction, state => (sensorAdapter.removeAll({...state, error: true, loading: false, total: 0}))),
  on(SensorActions.SensorLoadOneAction, state => ({ ...state, loading: true })),
  on(SensorActions.SensorLoadOneSuccessAction, 
    (state, action) => (
      state.total ? sensorAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        { ...state, loading: false, error: false, total: state.total }
      ) : sensorAdapter.setOne(action.payload, { ...state, loading: false, error: false, total: 1 })
    )
  ),
  on(SensorActions.SensorNewAction, state => ( { ...state, loading: true })),
  on(SensorActions.SensorNewFailureAction, state => ({ ...state, loading: false, error: true, total: state.total })),
  on(SensorActions.SensorUpdateAction, state => ( { ...state, loading: true })),
  on(SensorActions.SensorUpdateFailureAction, state => ( { ...state, loading: false, error: true, total: state.total })),
  on(SensorActions.SensorDeleteAction, state => ( { ...state, loading: true })),
  on(SensorActions.SensorDeleteSuccesAction, 
    (state, action) => (
      sensorAdapter.removeOne(action.id, { ...state, loading: false, error: false, total: (state.total > 0  ? state.total - 1 : 0)})
    )
  ),
  on(SensorActions.SensorDeleteFailuerAction, 
    state => (
      sensorAdapter.setAll([], {...state, error: true, loading: false, total: 0})
    )
  )
);
