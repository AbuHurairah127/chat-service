import * as dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
interface IDCollection {
  userId: string;
  socketId: string;
}
let _users: IDCollection[] = [];
const addUser = (userId: string, socketId: string): void => {
  !_users.some((user) => user.userId === userId) &&
    _users.push({ userId, socketId });
};
const removeUser = (socketId: string): void => {
  _users = _users.filter((user) => user.socketId === socketId);
};
const getUser = (userId: string): IDCollection | undefined => {
  return _users.find((user) => user.userId === userId);
};
const io = new Server(3000, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "OPTIONS"],
  },
});
// On Connection Formation with a user
io.on("connection", (socket) => {
  console.log("A user connected.");
  /* Sending a message to the clients. */
  io.emit("welcome", "Welcome to socket server");
  socket.on("addUser", (userId: string) => {
    addUser(userId, socket.id);
    io.emit("getUsers", _users);
  });
  // When user will disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", _users);
  });

  // Receiving and Sending Message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (typeof user === "object") {
      io.to(user.socketId).emit("getMessage", { senderId, text });
    }
  });
});
