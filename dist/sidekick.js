"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
class Sidekick {
    constructor(url, api_key) {
        this.client = (0, socket_io_client_1.io)(url, {
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
    process(data) {
        this.client.emit('message', data);
    }
    onPresencePointsGained(callback) {
        this.client.on('onPresencePointsGained', callback);
    }
    onStreakStarted(callback) {
        this.client.on('onStreakStarted', callback);
    }
    onStreakEnded(callback) {
        this.client.on('onStreakEnded', callback);
    }
    onNudgesChanged(callback) {
        this.client.on("onNudgesChanged", callback);
    }
    onNudgeCorrected(callback) {
        this.client.on("onNudgeCorrected", callback);
    }
    onAllNudgesCorrected(callback) {
        this.client.on("onAllNudgesCorrected", callback);
    }
}
exports.default = Sidekick;
//# sourceMappingURL=sidekick.js.map