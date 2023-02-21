import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MonitorState, monitorAdapter } from 'src/app/state/monitor.state';

export const {
  selectIds: _selectMonitorDataIds,
  selectEntities: _selectMonitorEntities,
  selectAll: _selectAllMonitor,
  selectTotal: _selectMonitorTotal
} = monitorAdapter.getSelectors();

export const selectMonitorState = createFeatureSelector<MonitorState>('monitor');

export const selectMonitor = createSelector(
    selectMonitorState,
    (state: MonitorState) => state.entities[0]
);

export const selectMonitorIds = createSelector(
  selectMonitorState,
  _selectMonitorDataIds
);

export const selectMonitorEntities = createSelector(
  selectMonitorState,
  _selectMonitorEntities
);

export const selectAllMonitor = createSelector(
  selectMonitorState,
  _selectAllMonitor
);

export const selectMonitorError = createSelector(
  selectMonitorState,
  (state: MonitorState): boolean => state.error
);

export const selectMonitorLoading = createSelector(
  selectMonitorState,
  (state: MonitorState): boolean => state.loading
);

export const selectMonitorTotal = createSelector(
  selectMonitorState,
  (state: MonitorState): number => state.total
);

export const selectEntitiesById = (id: number) => createSelector(
  selectAllMonitor, 
  (allMonitors) => allMonitors.find(elem => elem.id === id));
