import { ControlPanelState, initialControlPanelState, controlPanelAdapter } from 'src/app/state/control-panel.state';
import { createReducer, on } from '@ngrx/store';
import * as ControlPanelActions from 'src/app/store/control-panel.actions';


export const controlPanelReducer = createReducer(
    initialControlPanelState,
    on(ControlPanelActions.ControlPanelStartMonitoringAction, state => ({ ...state, loading: true })),
    on(ControlPanelActions.ControlPanelStartMonitoringSuccessAction, 
        (state, action) => (
            controlPanelAdapter.setOne(action.payload, { ...state, loading: false, error: false, total: 1 })
        )
    ),
    on(ControlPanelActions.ControlPanelStartMonitoringFailAction, state => ({ ...state, loading: false, error: true, total: 0 })),

    on(ControlPanelActions.ControlPanelStopMonitoringAction, state => ({ ...state, loading: true })),
    on(ControlPanelActions.ControlPanelStopMonitoringSuccessAction, 
        (state, action) => (
            controlPanelAdapter.setOne(action.payload, { ...state, loading: false, error: false, total: 1 })
        )
    ),
    on(ControlPanelActions.ControlPanelStopMonitoringFailureAction,  state => ({ ...state, loading: false, error: true })),
    on(ControlPanelActions.ControlPanelUpdateAction, 
        (state, action) => (
            controlPanelAdapter.setOne(action.payload, { ...state, loading: false, error: false, total: 1 })
        )
    ),
);
