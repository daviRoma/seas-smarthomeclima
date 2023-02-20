import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PolicyState, policyAdapter } from 'src/app/state/policy.state';

export const {
  selectIds: _selectPolicyDataIds,
  selectEntities: _selectPolicyEntities,
  selectAll: _selectAllPolicy,
  selectTotal: _selectPolicyTotal
} = policyAdapter.getSelectors();

export const selectPolicyState = createFeatureSelector<PolicyState>('policy');

export const selectPolicyIds = createSelector(
  selectPolicyState,
  _selectPolicyDataIds
);

export const selectPolicyEntities = createSelector(
  selectPolicyState,
  _selectPolicyEntities
);

export const selectAllPolicys = createSelector(
  selectPolicyState,
  _selectAllPolicy
);

export const selectPolicyError = createSelector(
  selectPolicyState,
  (state: PolicyState): boolean => state.error
);

export const selectPolicyLoading = createSelector(
  selectPolicyState,
  (state: PolicyState): boolean => state.loading
);

export const selectPolicyTotal = createSelector(
  selectPolicyState,
  (state: PolicyState): number => state.total
);

export const selectEntity = createSelector(
  selectAllPolicys,
  (entities: any[], props: { id: any; }) => entities.find((elem: any) => elem.id == props.id)
);

export const selectEntitiesByID = createSelector(
  selectAllPolicys,
  (entities: any[], props: { ids: number[]; }) => props.ids.map((id: number) => entities[id])
);

export const selectEntitiesBySmartRoom = createSelector(
  selectAllPolicys,
  (entities: any[], props: { id: number; }) => entities.filter((elem) => elem.smartRoom.id == props.id)
);