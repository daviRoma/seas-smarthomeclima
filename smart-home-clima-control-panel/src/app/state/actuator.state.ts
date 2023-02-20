/**
 * Actuator State interface.
*/
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import { Actuator } from 'src/app/models/actuator.model';

export interface ActuatorState extends EntityState<Actuator>{
  error: boolean;
  loading: boolean;
  total: number;
}

export const actuatorAdapter: EntityAdapter<Actuator> = createEntityAdapter<Actuator>({
  selectId: (actuator: Actuator) => actuator.id
});

export const initialActuatorState: ActuatorState = actuatorAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0
});