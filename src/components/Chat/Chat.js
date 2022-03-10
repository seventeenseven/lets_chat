import { useEffect, useRef, useState } from "react";
import "skeleton-css/css/normalize.css";
import "skeleton-css/css/skeleton.css";

import {
 initSocket,
 switchBtChannel,
 fetchChannels,
 fetchChannelMessages,
 sendMessage,
 subscribeToMessage,
} from "../../helpers/socket";
import { v4 as uuidv4 } from "uuid";
import "emoji-mart/css/emoji-mart.css";
import Channels from "../Channels";
import ChatScreen from "./ChatMessages";

function Chat({ username }) {
 const [message, setMessage] = useState("");
 const [channel, setChannel] = useState("Lets chat");
 const [channels, setChannels] = useState([]);
 const [messages, setMessages] = useState([]);
 const [messagesLoading, setMessagesLoading] = useState(true);
 const [channelsLoading, setChannelsLoading] = useState(true);
 const [showEmojiPicker, setShowEmojiPicker] = useState(false);

 const prevChannelRef = useRef();
 useEffect(() => {
   prevChannelRef.current = channel;
 });
 const prevChannel = prevChannelRef.current;

 useEffect(() => {
   if (prevChannel && channel) {
     switchBtChannel(prevChannel, channel);
     setChannel(channel);
   } else if (channel) {
     initSocket(channel, username);
   }
 }, [channel, username, prevChannel]);

 useEffect(() => {
   setMessages([]);
   setMessagesLoading(true);

   fetchChannelMessages(channel).then((res) => {
     setMessages(res);
     setMessagesLoading(false);
   });
 }, [channel]);

 useEffect(() => {
   fetchChannels().then((res) => {
     setChannels(res);
     setChannelsLoading(false);
   });

   subscribeToMessage((err, data) => {
     setMessages((messages) => [...messages, data]);
   });
 }, []);

 const handleMessageChange = (event) => {
   setMessage(event.target.value);
 };

 const handleMessageSend = (e) => {
   if (!message) return;

   e.preventDefault();
   const data = {
     id: uuidv4(),
     channel,
     user: username,
     body: message,
     time: Date.now(),
   };
   setMessages((messages) => [...messages, data]);
   sendMessage(data);
   setMessage("");
 };

 const handleEmojiSelect = (emoji) => {
   const newText = `${message}${emoji.native}`;

   setMessage(newText);
   setShowEmojiPicker(false);
 };

 return (
   <div className="chat-container">
     <Channels
       username={username}
       channelsLoading={channelsLoading}
       channels={channels}
       channel={channel}
       setChannel={setChannel}
     />
     <ChatScreen
       channel={channel}
       messagesLoading={messagesLoading}
       messages={messages}
       showEmojiPicker={showEmojiPicker}
       handleEmojiSelect={handleEmojiSelect}
       handleMessageSend={handleMessageSend}
       setShowEmojiPicker={setShowEmojiPicker}
       message={message}
       handleMessageChange={handleMessageChange}
     />
   </div>
 );
};

export default Chat;