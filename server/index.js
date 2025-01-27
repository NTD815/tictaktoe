import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("message", (msg) => {
    console.log(msg.uid);

    socket.emit("message", { uid: msg.uid });
  })
});

httpServer.listen(4000);