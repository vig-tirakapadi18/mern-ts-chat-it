import express from "express";
import http from "http";
import { Server } from "socket.io";

export const app = express();
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL as string],
  },
});

const userSocketMap: Record<string, string> = {}; // { userId: socketConnectionId}

export const getReceiverSocketId = (userId: string) => userSocketMap[userId];

io.on("connection", (socket) => {
  console.log("New user connected!", socket.id);

  const userId = socket.handshake.query.userId;

  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Sends events to all the connected users
  // io.emit("anyNameCanBeGiven")

  if (userId) userSocketMap[userId as string] = socket.id;

  socket.on("disconnect", () => {
    console.log("User disconnected!", socket.id);

    delete userSocketMap[userId as string];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
