import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../Contexts.jsx";


const LiveChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [userData, setUserData] = useState({
        username: useContext(AuthContext).username,
        message: "",
        connected: false,
    });

    useEffect(() => {
        const socket = new WebSocket(`https://reci-pa-ispeci-2-v32w.onrender.com/api/ms?username=${userData.username}`);

        socket.onopen = () => {
            console.log("Connected to live WebSocket server.");
            setSocket(socket);
        };

        socket.onmessage = (event) => {
            console.log("Message received from server:", event.data);

            try {
                const data = JSON.parse(event.data);
                setMessages(prev => [...prev, { text: data.content, sender: data.sender }]);
            } catch (error) {
                console.error("Error parsing message:", error);
            }
        };
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        // Cleanup on component unmount
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);


    const handleMessageInput = (event) => {
        const {value} = event.target;
        setUserData({...userData, message: value});
    };

    const sendPublicMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() && socket) {
            const message = {
                sender: userData.username,
                content: newMessage
            };

            // Add user message to chat
            setMessages(prev => [...prev, {text: newMessage, sender: userData.username}]);

            // Send message through WebSocket
            socket.send(JSON.stringify(message));
            console.log("Message sent:", message);

            setNewMessage('');
        }

    };
    return (
        <div className="chat-content">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.senderName === userData.username ? 'user' : 'ai'}`}>
                        {msg.sender !== userData.username && (
                            <strong>{msg.sender}: </strong>
                        )}
                        {msg.message}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={userData.message}
                    onChange={handleMessageInput}
                    placeholder="Unesite poruku..."
                />
                <button onClick={sendPublicMessage}>Pošalji</button>
            </div>
        </div>
    );
}

export default LiveChat;


