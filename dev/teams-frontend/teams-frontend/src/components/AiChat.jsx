import { useState, useEffect } from 'react';

const AiChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);

    // Add welcome message when component mounts
    useEffect(() => {
        setMessages([{ 
            text: "Pozdrav! 👋 Ja sam vaš AI asistent za recepte. Ovdje sam da vam pomognem pronaći" +
                " savršen recept za svaki obrok, priliku ili želju. Bilo da tražite ideje za brzi ručak, savjete " +
                "za pečenje kolača ili nešto egzotično za isprobati, samo me pitajte! " +
                "Recite mi što imate na umu, a ja ću vam poslati recept koji najbolje odgovara vašim željama. 🍴😊",
            sender: 'ai' 
        }]);
    }, []); // Empty dependency array means this runs once on mount

    useEffect(() => {
        // Initialize WebSocket connection
        const socket = new WebSocket("https://reci-pa-ispeci-2-v32w.onrender.com/api/aichat");

        socket.onopen = () => {
            console.log("Connected to WebSocket server.");
            setSocket(socket);
        };

        socket.onmessage = (event) => {
            console.log("Message received from server:", event.data);
            // Handle plain text response
            setMessages(prev => [...prev, { text: event.data, sender: 'ai' }]);
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

    const handleSend = async (e) => {
        e.preventDefault();
        if (newMessage.trim() && socket) {
            const message = {
                role: "user",
                content: newMessage
            };

            // Add user message to chat
            setMessages(prev => [...prev, { text: newMessage, sender: 'user' }]);

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