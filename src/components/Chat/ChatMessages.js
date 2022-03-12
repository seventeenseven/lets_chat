import moment from 'moment';

function ChatMessages( {messagesLoading, messages}) {
    console.log(messages);
    console.log(messagesLoading);
    return (
        <div className="chat-messages">
            {messagesLoading ?(
                <p>
                <span className="">Loading messages....</span>
              </p>
            ):
            messages.map((message) => 
            <div className="message-box">
            <strong>{message.user}</strong>
            <span className="message">{message.body}</span> 
            <small className="message-time">{moment(message.time).fromNow()}</small>  </div>)
            }
        </div>
    )
};

export default ChatMessages;