/**
 * Policy State interface.
*/
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import { Policy } from 'src/app/models/policy.model';

export interface PolicyState extends EntityState<Policy>{
  error: boolean;
  loading: boolean;
  total: number;
}

export const policyAdapter: EntityAdapter<Policy> = createEntityAdapter<Policy>({
  selectId: (policy: Policy) => policy.id
});

export const initialPolicyState: PolicyState = policyAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0
});