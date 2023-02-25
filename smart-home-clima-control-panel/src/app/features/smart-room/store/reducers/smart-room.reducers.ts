import { SmartRoomState, initialSmartRoomState, smartRoomAdapter } from 'src/app/state/smart-room.state';
import { createReducer, on } from '@ngrx/store';
import * as SmartRoomActions from './../actions/smart-room.actions';


export const smartRoomReducer = createReducer(
  initialSmartRoomState,
  on(SmartRoomActions.SmartRoomLoadAction, state => ({ ...state, loading: true })),
  on(SmartRoomActions.SmartRoomLoadSuccessAction, 
    (state, action) => (
      smartRoomAdapter.setAll( action.payload, {
        ...state,
        error: false,
        loading: false,
        total: action.payload ? action.payload.length : 0
      })
    )
  ),
  on(SmartRoomActions.SmartRoomLoadFailAction, state => (smartRoomAdapter.removeAll({...state, error: true, loading: false, total: 0}))),
  on(SmartRoomActions.SmartRoomLoadOneAction, state => ({ ...state, loading: true })),
  on(SmartRoomActions.SmartRoomLoadOneRedirectAction, 
    (state, action) => {
      return state.total ? smartRoomAdapter.addOne(
        action.payload, { ...state, loading: false, error: false, total: state.total + 1 }
      ) : smartRoomAdapter.setOne(action.payload, { ...state, loading: false, error: false, total: 1 });
    }
  ),
  on(SmartRoomActions.SmartRoomLoadOneSuccessAction, 
    (state, action) => (
      state.total ? smartRoomAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        { ...state, loading: false, error: false, total: state.total }
      ) : smartRoomAdapter.setOne(action.payload, { ...state, loading: false, error: false, total: 1 })
    )
  ),
  on(SmartRoomActions.SmartRoomNewAction, state => ( { ...state, loading: true })),
  on(SmartRoomActions.SmartRoomNewFailureAction, state => ({ ...state, loading: false, error: true, total: state.total })),
  on(SmartRoomActions.SmartRoomUpdateAction, state => ( { ...state, loading: true })),
  on(SmartRoomActions.SmartRoomUpdateFailureAction, state => ( { ...state, loading: false, error: true, total: state.total })),
  on(SmartRoomActions.SmartRoomUpdateManuallyAction, 
    (state, action) => (
      smartRoomAdapter.updateMany( 
        action.payload.map((smartRoom) => Object.assign({}, {id: smartRoom.id, changes: smartRoom})),
        {
          ...state,
          error: false,
          loading: false,
          total: action.payload ? action.payload.length : 0
        }
      )
    )
  ),
  on(SmartRoomActions.SmartRoomDeleteAction, state => ( { ...state, loading: true })),
  on(SmartRoomActions.SmartRoomDeleteSuccesAction, 
    (state, action) => (
      smartRoomAdapter.removeOne(action.id, { ...state, loading: false, error: false, total: (state.total > 0  ? state.total - 1 : 0)})
    )
  ),
  on(SmartRoomActions.SmartRoomDeleteFailuerAction, 
    state => (
      smartRoomAdapter.setAll([], {...state, error: true, loading: false, total: 0})
    )
  )
);
