//Default channels available for users
const channels = [
 {
   id: 1,
   name: "Lets chat",
   users: [],
 },
 {
   id: 2,
   name: "Learn React",
   users: [],
 },
 {
   id: 3,
   name: "Friends chat",
   users: [],
 },
];

const addUserToChannel = (channel, username) => {
 channels.filter((c) => c.name === channel).map((c) => {
   c.users.push(username);

   return c;
 });
}

module.exports = { channels, addUserToChannel };
