import { useState, useContext } from 'react';
import ChatWindow from './ChatWindow.jsx';
import { AuthContext } from "../../Contexts.jsx";
import { BsFillChatFill } from 'react-icons/bs';

const ChatTab = () => {
    const currentUser = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    if (!currentUser) return null;

    return (
        <>
            {isOpen && <div className="chat-overlay" onClick={() => setIsOpen(false)} />}
            <div className={`chat-tab ${isOpen ? 'open' : ''}`}>
                <button 
                    className="chat-tab-button"
                    onClick={() => setIsOpen(!isOpen)}
                    title={isOpen ? 'Zatvori razgovor' : 'Otvori razgovor'}
                >
                    <BsFillChatFill size={24} />
                </button>
                <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
        </>
    );
};

export default ChatTab; 