/**
 * Smart Room model
 */
import { Sensor } from './sensor.model';
import { Actuator } from './actuator.model';
import { PolicyGroup } from './policy-group.model';


export class SmartRoom {
  id!: number;
  number?: number;
  type!: string;
  temperature?: number;
  policyGroups?: PolicyGroup[];
  sensors!: Sensor[];
  actuators!: Actuator[];
}

export class SmartRoomRequest {
  id!: number;
}
