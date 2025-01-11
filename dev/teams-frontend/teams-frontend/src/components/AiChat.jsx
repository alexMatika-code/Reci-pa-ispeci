import React, { useState } from 'react';

const AiChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = async (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const userMessage = { text: newMessage, sender: 'user' };
            setMessages(prev => [...prev, userMessage]);
            setNewMessage('');


            const aiResponse = { text: 'This is a simulated AI response.', sender: 'ai' };
            setTimeout(() => {
                setMessages(prev => [...prev, aiResponse]);
            }, 1000);
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
                    placeholder="Pitaj AI nešto..."
                />
                <button type="submit">Pošalji</button>
            </form>
        </div>
    );
};

export default AiChat; 