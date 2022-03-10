import "./index.css";
import "./App.css";
import { useState } from "react";
import Chat from "./components/Chat/Chat";
import Login from "./components/login";

function App() {
 const [username, setUsername] = useState("");
 const [loggedIn, setLoggedIn] = useState(true);

 const handleUsernameChange = (event) => {
   setUsername(event.target.value.trim());
 };

 const handleUsernameSubmit = (e) => {
   if (!username.length) return;

   e.preventDefault();

   setLoggedIn(true);
   console.log(username);
   console.log(loggedIn)
 };

 return (
   <div className="main-div">
     {!loggedIn ? (
       <Login
         usernameChange={handleUsernameChange}
         usernameSubmit={handleUsernameSubmit}
       />
     ) : (
       <Chat username={username} />
     )}
   </div>
 );
}

export default App;