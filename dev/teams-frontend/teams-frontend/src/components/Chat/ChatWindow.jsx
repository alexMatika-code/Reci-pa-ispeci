import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import LiveChat from './LiveChat.jsx';
import AiChat from './AiChat.jsx';

const ChatWindow = ({ isOpen, onClose }) => {
    const [key, setKey] = useState('live');

    return (
        <div className={`${isOpen ? "d-flex" : "d-none"} chat-window`}>
            <div className="chat-header">
                <span>Razgovor</span>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>
            <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="shadow-sm"
            >
                <Tab eventKey="live" title="Live Razgovor!">
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