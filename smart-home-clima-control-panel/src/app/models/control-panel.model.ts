/**
 * Control Panel model
 */

export class ControlPanel {
    id: number = 1;
    isStarted: boolean = false;
    channels: Channel[] = [];
}

export class Channel {
    topic!: string;
    messages!: any[];
}