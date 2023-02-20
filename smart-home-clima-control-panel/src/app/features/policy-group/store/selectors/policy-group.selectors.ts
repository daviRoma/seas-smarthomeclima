import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PolicyGroupState, policyGroupAdapter } from 'src/app/state/policy-group.state';

export const {
  selectIds: _selectPolicyGroupDataIds,
  selectEntities: _selectPolicyGroupEntities,
  selectAll: _selectAllPolicyGroup,
  selectTotal: _selectPolicyGroupTotal
} = policyGroupAdapter.getSelectors();

export const selectPolicyGroupState = createFeatureSelector<PolicyGroupState>('policyGroup');

export const selectPolicyGroupIds = createSelector(
  selectPolicyGroupState,
  _selectPolicyGroupDataIds
);

export const selectPolicyGroupEntities = createSelector(
  selectPolicyGroupState,
  _selectPolicyGroupEntities
);

export const selectAllPolicyGroups = createSelector(
  selectPolicyGroupState,
  _selectAllPolicyGroup
);

export const selectPolicyGroupError = createSelector(
  selectPolicyGroupState,
  (state: PolicyGroupState): boolean => state.error
);

export const selectPolicyGroupLoading = createSelector(
  selectPolicyGroupState,
  (state: PolicyGroupState): boolean => state.loading
);

export const selectPolicyGroupTotal = createSelector(
  selectPolicyGroupState,
  (state: PolicyGroupState): number => state.total
);

export const selectEntity = createSelector(
  selectAllPolicyGroups,
  (entities: any[], props: { id: any; }) => entities.find((elem: any) => elem.id == props.id)
);

export const selectEntitiesByID = createSelector(
  selectAllPolicyGroups,
  (entities: any[], props: { ids: number[]; }) => props.ids.map((id: number) => entities[id])
);

export const selectEntitiesBySmartRoom = createSelector(
  selectAllPolicyGroups,
  (entities: any[], props: { id: number; }) => entities.filter((elem) => elem.smartRoom.id == props.id)
);