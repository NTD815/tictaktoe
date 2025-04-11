import matchmakingRT from "./matchmaking.js";
import { connectionStore } from "./ConnectionStore.js";
import ConnectionData from "./ConnectionData.js";

export default async function t2oeRT(io) {
    io.on("connection", (socket) => {
        console.log("User connected. Connection ID: ", socket.id);

        const connectionData = new ConnectionData({
            username: "Test"
        }, socket);

        connectionStore().setConnection("testUserId", connectionData);
        console.log(connectionStore().getConnection("testUserId"));
        
        socket.on("message", (msg) => {
            console.log(msg);
        
            socket.emit("message", { uid: msg.uid });
        })
    });
}