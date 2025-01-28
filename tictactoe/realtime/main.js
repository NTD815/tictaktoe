import statusRT from "./status.js";
import chatRT from "./chat.js";
import gamespaceRT from "./gamespace.js";
import matchmakingRT from "./matchmaking.js";

export default async function t2oeRT(io) {

  //defining namespace or modules specific to feature
  const game = io.of("/game");
  const chat = io.of("/chat");
  const status = io.of("/status");
  const matchmaking = io.of("/matchmaking");

  status.on("connection", statusRT);
  chat.on("connection", chatRT);
  game.on("connection", gamespaceRT);
  matchmaking.on("connection", matchmakingRT);

  //General connection - global/anyone
  io.on("connection", (socket) => {
      console.log("User connected. Connection ID: ", socket.id);
    
      socket.on("message", (msg) => {
        console.log(msg);
    
        socket.emit("message", { uid: msg.uid });
      })
  });
}