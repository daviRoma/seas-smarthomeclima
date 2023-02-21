/**
 * Control-Panel State interface.
*/
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import { Monitor } from 'src/app/models/monitor.model';

export interface MonitorState extends EntityState<Monitor>{
  error: boolean;
  loading: boolean;
  total: number;
}

export const monitorAdapter: EntityAdapter<Monitor> = createEntityAdapter<Monitor>({
  selectId: (monitor: Monitor) => monitor.id
});

export const initialMonitorState: MonitorState = monitorAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0
});