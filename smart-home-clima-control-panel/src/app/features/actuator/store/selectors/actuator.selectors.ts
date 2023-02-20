import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ActuatorState, actuatorAdapter } from 'src/app/state/actuator.state';

export const {
  selectIds: _selectActuatorDataIds,
  selectEntities: _selectActuatorEntities,
  selectAll: _selectAllActuator,
  selectTotal: _selectActuatorTotal
} = actuatorAdapter.getSelectors();

export const selectActuatorState = createFeatureSelector<ActuatorState>('actuator');

export const selectActuatorIds = createSelector(
  selectActuatorState,
  _selectActuatorDataIds
);

export const selectActuatorEntities = createSelector(
  selectActuatorState,
  _selectActuatorEntities
);

export const selectAllActuators = createSelector(
  selectActuatorState,
  _selectAllActuator
);

export const selectActuatorError = createSelector(
  selectActuatorState,
  (state: ActuatorState): boolean => state.error
);

export const selectActuatorLoading = createSelector(
  selectActuatorState,
  (state: ActuatorState): boolean => state.loading
);

export const selectActuatorTotal = createSelector(
  selectActuatorState,
  (state: ActuatorState): number => state.total
);

export const selectEntity = createSelector(
  selectAllActuators,
  (entities: any[], props: { id: any; }) => entities.find((elem: any) => elem.id == props.id)
);

export const selectEntitiesByID = createSelector(
  selectAllActuators,
  (entities: any[], props: { ids: number[]; }) => props.ids.map((id: number) => entities[id])
);

export const selectEntitiesBySmartRoom = createSelector(
  selectAllActuators,
  (entities: any[], props: { id: number; }) => entities.filter((elem) => elem.smartRoom.id == props.id)
);