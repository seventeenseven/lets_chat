import "./index.css";
import "./App.css";
import { useState } from "react";
import Chat from "./components/Chat/Chat";
import Login from "./components/login";

function App() {
 const [username, setUsername] = useState("");
 const [loggedIn, setLoggedIn] = useState(false);

 const handleUsernameChange = (event) => {
   setUsername(event.target.value.trim());
 };

 const handleUsernameSubmit = (e) => {
   if (username.length === 0){
     console.log("Empty username")
    return 0;
   } else {
    e.preventDefault();
   setLoggedIn(true);
   }
 
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