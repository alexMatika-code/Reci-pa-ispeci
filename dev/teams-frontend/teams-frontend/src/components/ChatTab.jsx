import React, { useState, useContext } from 'react';
import ChatWindow from './ChatWindow';
import { AuthContext } from "../Contexts.jsx";

const ChatTab = () => {
    const currentUser = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    // If no user is logged in, don't render anything
    if (!currentUser) return null;

    return (
        <>
            {isOpen && <div className="chat-overlay" onClick={() => setIsOpen(false)} />}
            <div className={`chat-tab ${isOpen ? 'open' : ''}`}>
                <button 
                    className="chat-tab-button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? 'Zatvori razgovor' : 'Otvori razgovor'}
                </button>
                <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
        </>
    );
};

export default ChatTab; 