import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import bootstrap from "./bootstrap.js";

//execute bootstrap to load all necessary configurations
bootstrap();

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

httpServer.listen(process.env.APP_PORT || 3000, () => {
  console.log(`Listening on port ${process.env.APP_PORT || 3000}`);
});