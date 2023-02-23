import { SmartRoom } from 'src/app/models/smart-room.model';

export class Actuator {
    id!: number;
    type?: string;
    active?: boolean;
    power: number[] = [];
    smartRoom!: SmartRoom
}

export class ActuatorRequest {
    smartRoomId!: number;
    actuators!: Actuator[];
}