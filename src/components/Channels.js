import { useState } from "react";

function Channels({
 username,
 channelsLoading,
 channels,
 channel,
 users,
 setChannel,
}) {
  console.log(users);
  
 return (
   <aside className="sidebar left-sidebar">
     <div className="user-profile">
       <span className="username">@ {username} <i className="online presence"></i></span>
     </div>
     <div className="channels">
       <ul className="chat-channels">
         {channelsLoading ? (
           <li>
             <span className="channel-name">Loading channels....</span>
           </li>
         ) : channels.length ? (
           channels.map((c) => {
             return (
               <li
                 key={c.id}
                 onClick={() => setChannel(c.name)}
                 className={c.name === channel ? "active" : ""}
               >
                 <span className="channel-name">{c.name}</span>
               </li>
             );
           })
           
         ) : (
           <li>
             <span className="channel-name">No channels available</span>
           </li>
         )}
       </ul>
       <h6>Online Members</h6>
           <ul className="chat-channels">
             { channels.length ?
           Object.entries(users)
           .map( ([user, id])=>
           <li key={user} >{user}
           <span className="presence online"> </span>
           </li>
           ):""}</ul>
     </div>
   </aside>
 );
}

export default Channels;