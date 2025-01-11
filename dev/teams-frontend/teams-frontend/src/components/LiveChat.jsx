import React, { useState } from 'react';

const LiveChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { text: newMessage, sender: 'user' }]);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-content">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend} className="chat-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Pošalji</button>
            </form>
        </div>
    );
};

export default LiveChat; 