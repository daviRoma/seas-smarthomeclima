/**
 * Sensor State interface.
*/
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import { Sensor } from 'src/app/models/sensor.model';

export interface SensorState extends EntityState<Sensor>{
  error: boolean;
  loading: boolean;
  total: number;
}

export const sensorAdapter: EntityAdapter<Sensor> = createEntityAdapter<Sensor>({
  selectId: (sensor: Sensor) => sensor.id
});

export const initialSensorState: SensorState = sensorAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0
});