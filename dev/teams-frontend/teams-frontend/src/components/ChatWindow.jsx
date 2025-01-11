import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import LiveChat from './LiveChat';
import AiChat from './AiChat';

const ChatWindow = ({ isOpen, onClose }) => {
    const [key, setKey] = useState('live');

    if (!isOpen) return null;  // Don't render if not open

    return (
        <div className="chat-window">
            <div className="chat-header">
                <span>Razgovor</span>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>
            <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="live" title="Razgovor sa svima!">
                    <LiveChat />
                </Tab>
                <Tab eventKey="ai" title="Tvoj AI asistent!">
                    <AiChat />
                </Tab>
            </Tabs>
        </div>
    );
};

export default ChatWindow; 