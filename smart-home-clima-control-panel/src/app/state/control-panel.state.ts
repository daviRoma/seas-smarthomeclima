/**
 * Control-Panel State interface.
*/
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import { ControlPanel } from 'src/app/models/control-panel.model';

export interface ControlPanelState extends EntityState<ControlPanel>{
  error: boolean;
  loading: boolean;
  total: number;
}

export const controlPanelAdapter: EntityAdapter<ControlPanel> = createEntityAdapter<ControlPanel>({
  selectId: (controlPanel: ControlPanel) => controlPanel.id
});

export const initialControlPanelState: ControlPanelState = controlPanelAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0
});