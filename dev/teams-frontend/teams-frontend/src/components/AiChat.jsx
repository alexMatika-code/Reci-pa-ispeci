import { useState, useEffect, useRef } from 'react';

const TypingIndicator = () => (
    <div className="message ai typing-indicator">
        <span></span>
        <span></span>
        <span></span>
    </div>
);

const AiChat = () => {
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('aiChatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [{
            text: "Pozdrav! 👋 Ja sam Vaš AI asistent za recepte. Ovdje sam da vam pomognem pronaći" +
                " savršen recept za svaki obrok, priliku ili želju. Bilo da tražite ideje za brzi ručak, savjete " +
                "za izradu kolača ili nešto egzotično za isprobati, samo me pitajte! " +
                "Recite mi što imate na umu, a ja ću Vam poslati recept koji najbolje odgovara Vašim željama. 🍴😊",
            sender: 'ai'
        }];
    });
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('aiChatMessages', JSON.stringify(messages));
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const socket = new WebSocket("http://localhost:8080/aichat");

        socket.onopen = () => {
            console.log("Connected to WebSocket server.");
            setSocket(socket);
        };

        socket.onmessage = (event) => {
            console.log("Message received from server:", event.data);
            setIsTyping(false);
            setMessages(prev => [...prev, { text: event.data, sender: 'ai' }]);
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

    const handleSend = async (e) => {
        e.preventDefault();
        if (newMessage.trim() && socket) {
            const message = {
                role: "user",
                content: newMessage
            };

            setMessages(prev => [...prev, { text: newMessage, sender: 'user' }]);
            setIsTyping(true);

            socket.send(JSON.stringify(message));
            console.log("Message sent:", message);

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
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
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