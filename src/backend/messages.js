const all_messages = [];

const addMessage = (data) => {
 all_messages.push(data);

 return data;
};

const getChannelMessages = (channel) =>
 all_messages.filter((message) => message.channel === channel);

module.exports = { addMessage, getChannelMessages };
