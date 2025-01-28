import bootstrap from './bootstrap.js'

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import t2oeRT from "./tictactoe/realtime/main.js"

import router from "./routes.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use(express.json());
app.use("/", router);

(async () => {
  await bootstrap();

  t2oeRT(io);
  
  httpServer.listen(process.env.APP_PORT || 3000, () => {
    console.log(`Listening on port ${process.env.APP_PORT || 3000}`);
  });

})()
