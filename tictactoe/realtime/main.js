import matchmakingRT from "./matchmaking.js";
import { connectionStore } from "./ConnectionStore.js";
import ConnectionData from "./ConnectionData.js";

export default async function t2oeRT(io) {
    io.on("connection", (socket) => {
        console.log("A user connected. Guest right now. SocketID: " + socket.id);

        socket.on("authenticate", (data) => {
            console.log("User authenticating");
            
            const connectionData = new ConnectionData({
                id: data.userId,
                username: "Test"
            }, socket);

            connectionStore().setConnection(data.userId, connectionData);
            // console.log(connectionStore().getConnection(data.userId));

            console.log(connectionStore().totalConnections() + " total connections");

            socket.emit("total_active_users", connectionStore().totalConnections());
        });

        socket.on("leave_presence_channel", (data) => {
            console.log("User leaving presence channel");
            connectionStore().removeConnection(data.userId);
            console.log(connectionStore().totalConnections() + " total connections");
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected. SocketID: " + socket.id);
        });
    });
}