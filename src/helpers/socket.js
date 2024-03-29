import io from "socket.io-client";
import axios from "axios";

let socket;
//Server listening address
const SOCKET_URL = "http://localhost:8080";

//Initializing the user connection to
export const initSocket = (channel, username) => {
  console.log('in init')
 socket = io(SOCKET_URL, {
   query: { channel, username },
 });

 console.log("Connecting to socket..");

 if (socket && channel) {
   socket.emit("CHANNEL_JOIN", channel);
 }
};

export const switchBtChannel = (prevChannel, channel) => {
 if (socket) {
   socket.emit("CHANNEL_SWITCH",{prevChannel, channel});
 }
};
export const subscribeToMessage = (callback) => {
 if (!socket) {
   return;
 }

 socket.on("NEW_MESSAGE", (data) => {
   callback(null, data);
 });};

export const sendMessage = (data) => {
 if (!socket) {
   return;
 }

 socket.emit("MESSAGE_SEND", data);
};

//Get all the channels available
export const fetchChannels = async () => {
 const response = await axios.get(`${SOCKET_URL}/getChannels`);

 return response.data.channels;
};

//Get the online users
export const fetchUsers = async () => {
  const response = await axios.get(`${SOCKET_URL}/getUsers`);
 
  return response.data.users;
 };

//Get specific messages of a channel
export const fetchChannelMessages = async (channel) => {
 const response = await axios.get(
   `${SOCKET_URL}/channels/${channel}/messages`
 );

 return response.data.allMessages;
};
