import { Socket } from "socket.io-client";
export interface MediaData {
    imageData: Uint8Array;
    speaking: boolean;
}
declare class Sidekick {
    client: Socket<any, any>;
    constructor(url: string, api_key: string);
    process(data: MediaData): void;
    onPresencePointsGained(callback: (points: number) => void): void;
    onStreakStarted(callback: () => void): void;
    onStreakEnded(callback: () => void): void;
    onNudgesChanged(callback: (nudges: any) => void): void;
    onNudgeCorrected(callback: (nudge: any) => void): void;
    onAllNudgesCorrected(callback: () => void): void;
}
export default Sidekick;
