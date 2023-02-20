import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ControlPanelState, controlPanelAdapter } from 'src/app/state/control-panel.state';

export const {
  selectIds: _selectControlPanelDataIds,
  selectEntities: _selectControlPanelEntities,
  selectAll: _selectAllControlPanel,
  selectTotal: _selectControlPanelTotal
} = controlPanelAdapter.getSelectors();

export const selectControlPanelState = createFeatureSelector<ControlPanelState>('controlPanel');

export const selectControlPanel = createSelector(
    selectControlPanelState,
    (state: ControlPanelState) => state.entities[0]
);

export const selectControlPanelIds = createSelector(
  selectControlPanelState,
  _selectControlPanelDataIds
);

export const selectControlPanelEntities = createSelector(
  selectControlPanelState,
  _selectControlPanelEntities
);

export const selectAllControlPanel = createSelector(
  selectControlPanelState,
  _selectAllControlPanel
);

export const selectControlPanelError = createSelector(
  selectControlPanelState,
  (state: ControlPanelState): boolean => state.error
);

export const selectControlPanelLoading = createSelector(
  selectControlPanelState,
  (state: ControlPanelState): boolean => state.loading
);

export const selectControlPanelTotal = createSelector(
  selectControlPanelState,
  (state: ControlPanelState): number => state.total
);

export const selectEntitiesById = (id: number) => createSelector(
  selectAllControlPanel, 
  (allControlPanels) => allControlPanels.find(elem => elem.id === id));
