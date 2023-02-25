/**
 * Monitor model
 */

export class Monitor {
    id: number = 1;
    isStarted: boolean = false;
    channels!: Channel[];
}

export class Channel {
    topic!: string;
    deviceId!: number;
    messages!: PayloadMessage[];
}

export class PayloadMessage {
    id!: number;
    value!: number;
    createdDate!: string;
}