/**
 * Policy Group State interface.
*/
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import { PolicyGroup } from 'src/app/models/policy-group.model';

export interface PolicyGroupState extends EntityState<PolicyGroup>{
  error: boolean;
  loading: boolean;
  total: number;
}

export const policyGroupAdapter: EntityAdapter<PolicyGroup> = createEntityAdapter<PolicyGroup>({
  selectId: (policyGroup: PolicyGroup) => policyGroup.id
});

export const initialPolicyGroupState: PolicyGroupState = policyGroupAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0
});