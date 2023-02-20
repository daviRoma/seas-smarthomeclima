import { SmartRoom } from 'src/app/models/smart-room.model';

export class Sensor {
    id!: number;
    type?: string;
    active?: boolean;
    values!: number[];
    smartRoom!: SmartRoom;
}

export class SensorRequest {
    sensors!: Sensor[];
    smartRoomId!: number
}