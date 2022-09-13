import { io, Socket } from "socket.io-client";

export interface MediaData {
    imageData: Uint8Array;
    speaking: boolean;
} 

class Sidekick {
  client: Socket<any, any>;

  constructor(url: string, api_key: string) {
    this.client = io(url, {
      path: "/sidekick/api/",
      extraHeaders: {
        token: api_key,
      }
    });
    this.client.on("connect_error", (err) => {
      console.log(err);
    });
    this.client.on("connect", () => {
      console.log("Connected to sidekick api.");
      this.client.emit("open", {
        consumer: "other",
      });
    });
  }
  process(data: MediaData) {
    this.client.emit('message', data);
  }
  onPresencePointsGained(callback: (points: number) => void) {
    this.client.on('onPresencePointsGained', callback);
  }
  onStreakStarted(callback: () => void) {
    this.client.on('onStreakStarted', callback);
  }
  onStreakEnded(callback: ()=>void) {
    this.client.on('onStreakEnded', callback);
  }
  onNudgesChanged(callback: (nudges: any) => void) {
    this.client.on("onNudgesChanged", callback);
  }
  onNudgeCorrected(callback: (nudge: any) => void) {
    this.client.on("onNudgeCorrected", callback);
  }
  onAllNudgesCorrected(callback: () => void) {
    this.client.on("onAllNudgesCorrected", callback);
  }
}

export default Sidekick;
