import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SmartRoomState, smartRoomAdapter } from 'src/app/state/smart-room.state';

export const {
  selectIds: _selectSmartRoomDataIds,
  selectEntities: _selectSmartRoomEntities,
  selectAll: _selectAllSmartRoom,
  selectTotal: _selectSmartRoomTotal
} = smartRoomAdapter.getSelectors();

export const selectSmartRoomState = createFeatureSelector<SmartRoomState>('smartRoom');

export const selectSmartRoomIds = createSelector(
  selectSmartRoomState,
  _selectSmartRoomDataIds
);

export const selectSmartRoomEntities = createSelector(
  selectSmartRoomState,
  _selectSmartRoomEntities
);

export const selectAllSmartRoom = createSelector(
  selectSmartRoomState,
  _selectAllSmartRoom
);

export const selectSmartRoomError = createSelector(
  selectSmartRoomState,
  (state: SmartRoomState): boolean => state.error
);

export const selectSmartRoomLoading = createSelector(
  selectSmartRoomState,
  (state: SmartRoomState): boolean => state.loading
);

export const selectSmartRoomTotal = createSelector(
  selectSmartRoomState,
  (state: SmartRoomState): number => state.total
);

export const selectEntity = (elementId: number) => createSelector(
  selectAllSmartRoom,
  (entities: any[]) => entities.find((elem: any) => elem.id == elementId)
);

export const selectEntitiesById = (id: number) => createSelector(
  selectAllSmartRoom, 
  (allSmartRooms) => allSmartRooms.find(elem => elem.id === id));
