// from: https://socket.io/docs/v4/

import { Server } from "socket.io";

const io = new Server(3000);

io.on("connection", (socket) => {
  // send a message to the client
  // socket.emit("message", 1, "2", { 3: Buffer.from([4]) });
  socket.emit("message", "hello client");

  // receive a message from the client
  socket.on("message", (...args) => {
    console.log("args:", args)
  });
});
