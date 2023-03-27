import { SmartRoom } from './smart-room.model';
import { Policy } from "./policy.model";

export class PolicyGroup {
    id!: number;
    mode?: string;
    season!: string;
    active?: boolean;
    startDate?: Date;
    endDate?: Date;
    policies?: Policy[];
    smartRoom!: SmartRoom;
}

export class PolicyGroupRequest {
    policyGroups!: PolicyGroup[];
    smartRoomId!: number;
}