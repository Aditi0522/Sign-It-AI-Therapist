import React from 'react';

const ChatBox = ({ messages }) => {
    return (
        <div style = {{ height:'300px', overflowY:'auto', border:'1px solid #ccc', padding: '10px', margin:'10px 0'}}>
            {messages.map((msg,i)=>(
                <div key={i} style={{ margin:'5px 0'}}>
                    <strong >{msg.sender}:</strong> {msg.text}
                </div>
            ))}
        </div>
    );
};

export default ChatBox;