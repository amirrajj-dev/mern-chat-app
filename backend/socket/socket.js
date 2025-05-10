import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

export const app = express();

export const server = http.createServer(app)

export const io = new Server(server , {
    cors : {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
})


const socketMap = {}

export const getReceiverSocketId = (userId) => {
    return socketMap[userId];
}
io.on("connection", (socket) => {
    console.log("a user connected =>", socket.id);
    const userId = socket.handshake.query.userId;
  
    if (userId) {
      socket.userId = userId; // ✅ Attach it directly to the socket
      socketMap[userId] = socket.id;
    }
  
    io.emit("onlineUsers", Object.keys(socketMap));
  
    socket.on("disconnect", () => {
      console.log("a user disconnected =>", socket.id);
      if (socket.userId) {
        delete socketMap[socket.userId];
        io.emit("onlineUsers", Object.keys(socketMap));
      }
    });
  });  