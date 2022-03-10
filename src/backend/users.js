const users = {};

const addUser = (username, socketId) => {
   users[username] = socketId;
}

const removeUser = (username) => {
   if(users.hasOwnProperty(username)) {
       delete users[username];
   }
}

module.exports = { users, addUser, removeUser };
