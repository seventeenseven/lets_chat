const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const { addMessage, getChannelMessages } = require("./messages");
const { channels, addUserToChannel } = require("./channels");

const { addUser, removeUser } = require("./users");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
 cors: {
   origin: "*",
 },
});

const PORT = process.env.PORT || 8080;

io.on("connection", (socket) => {
 // Get username and channel
 const { username, channel } = socket.handshake.query;
 console.log(`${username} connected`);
 // Join the user to the channel
 socket.join(channel);
 addUser(username, socket.id);
 addUserToChannel(channel, username);

 // Handle disconnect
 socket.on("disconnect", () => {
   console.log(`${username} disconnected`);
   removeUser(username);
 });
// Handle the switch
 socket.on("CHANNEL_SWITCH", (data) => {
   const { prevChannel, channel } = data;
   if (prevChannel) {
     socket.leave(prevChannel);
   }
   if (channel) {
     socket.join(channel);
   }
 });

 socket.on("MESSAGE_SEND", (data) => {
   addMessage(data);
   const { channel } = data;
   socket.broadcast.to(channel).emit("NEW_MESSAGE", data);
 });
});
//Send the msgs of this channel
app.get("/channels/:channel/messages", (req, res) => {
 const allMessages = getChannelMessages(req.params.channel);

 return res.json({ allMessages });
});

app.get("/getChannels", (req, res) => {
 return res.json({ channels });
});

server.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
