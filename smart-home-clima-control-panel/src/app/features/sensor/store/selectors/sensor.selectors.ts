import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SensorState, sensorAdapter } from 'src/app/state/sensor.state';

export const {
  selectIds: _selectSensorDataIds,
  selectEntities: _selectSensorEntities,
  selectAll: _selectAllSensor,
  selectTotal: _selectSensorTotal
} = sensorAdapter.getSelectors();

export const selectSensorState = createFeatureSelector<SensorState>('sensor');

export const selectSensorIds = createSelector(
  selectSensorState,
  _selectSensorDataIds
);

export const selectSensorEntities = createSelector(
  selectSensorState,
  _selectSensorEntities
);

export const selectAllSensors = createSelector(
  selectSensorState,
  _selectAllSensor
);

export const selectSensorError = createSelector(
  selectSensorState,
  (state: SensorState): boolean => state.error
);

export const selectSensorLoading = createSelector(
  selectSensorState,
  (state: SensorState): boolean => state.loading
);

export const selectSensorTotal = createSelector(
  selectSensorState,
  (state: SensorState): number => state.total
);

export const selectEntity = createSelector(
  selectAllSensors,
  (entities: any[], props: { id: any; }) => entities.find((elem: any) => elem.id == props.id)
);

export const selectEntitiesByID = createSelector(
  selectAllSensors,
  (entities: any[], props: { ids: number[]; }) => props.ids.map((id: number) => entities[id])
);

export const selectEntitiesBySmartRoom = createSelector(
  selectAllSensors,
  (entities: any[], props: { id: number; }) => entities.filter((elem) => elem.smartRoom.id == props.id)
);