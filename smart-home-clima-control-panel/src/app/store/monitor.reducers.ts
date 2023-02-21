import { initialMonitorState, monitorAdapter } from 'src/app/state/monitor.state';
import { createReducer, on } from '@ngrx/store';
import * as MonitorActions from 'src/app/store/monitor.actions';


export const monitorReducer = createReducer(
    initialMonitorState,
    on(MonitorActions.MonitorStartMonitoringAction, state => ({ ...state, loading: true })),
    on(MonitorActions.MonitorStartMonitoringSuccessAction, 
        (state, action) => (
            monitorAdapter.setOne(action.payload, { ...state, loading: false, error: false, total: 1 })
        )
    ),
    on(MonitorActions.MonitorStartMonitoringFailAction, state => ({ ...state, loading: false, error: true, total: 0 })),

    on(MonitorActions.MonitorStopMonitoringAction, state => ({ ...state, loading: true })),
    on(MonitorActions.MonitorStopMonitoringSuccessAction, 
        (state, action) => (
            monitorAdapter.setOne(action.payload, { ...state, loading: false, error: false, total: 1 })
        )
    ),
    on(MonitorActions.MonitorStopMonitoringFailureAction,  state => ({ ...state, loading: false, error: true })),
    on(MonitorActions.MonitorUpdateAction, 
        (state, action) => (
            monitorAdapter.setOne(action.payload, { ...state, loading: false, error: false, total: 1 })
        )
    ),
);
