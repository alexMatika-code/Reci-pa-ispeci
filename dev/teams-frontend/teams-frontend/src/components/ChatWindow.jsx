import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import LiveChat from './LiveChat';
import AiChat from './AiChat';

const ChatWindow = ({ isOpen, onClose }) => {
    const [key, setKey] = useState('live');

    // Don't render if not open
    // if (!isOpen) return null;

    return (
        <div className={`${isOpen ? "d-flex" : "d-none"}} chat-window`}>
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