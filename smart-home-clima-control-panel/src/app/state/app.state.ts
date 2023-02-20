/**
 * App state
*/
import { SmartRoomState, initialSmartRoomState } from './smart-room.state';
import { PolicyGroupState, initialPolicyGroupState } from 'src/app/state/policy-group.state';
import { PolicyState, initialPolicyState } from 'src/app/state/policy.state';
import { SensorState, initialSensorState } from 'src/app/state/sensor.state';
import { ActuatorState, initialActuatorState } from 'src/app/state/actuator.state';
import { ControlPanelState, initialControlPanelState } from './control-panel.state';

import * as smartRoom from 'src/app/features/smart-room/store/reducers/smart-room.reducers';
import * as policyGroup from 'src/app/features/policy-group/store/reducers/policy-group.reducers';
import * as policy from 'src/app/features/policy/store/reducers/policy.reducers';
import * as sensor from 'src/app/features/sensor/store/reducers/sensor.reducers';
import * as actuator from 'src/app/features/actuator/store/reducers/actuator.reducers';
import * as controlPanel from 'src/app/store/control-panel.reducers';


export interface AppState {
  smartRoom: SmartRoomState;
  policyGroup: PolicyGroupState;
  policy: PolicyState;
  sensor: SensorState;
  actuator: ActuatorState;
  controlPanel: ControlPanelState
}

export const reducers = {
  smartRoom: smartRoom.smartRoomReducer,
  policyGroup: policyGroup.policyGroupReducer,
  policy: policy.policyReducer,
  sensor: sensor.sensorReducer,
  actuator: actuator.actuatorReducer,
  controlPanel: controlPanel.controlPanelReducer
};

export const initialAppState: AppState = {
  smartRoom: initialSmartRoomState,
  policyGroup: initialPolicyGroupState,
  policy: initialPolicyState,
  sensor: initialSensorState,
  actuator: initialActuatorState,
  controlPanel: initialControlPanelState
};
