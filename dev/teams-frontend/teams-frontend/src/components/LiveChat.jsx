import {useContext, useEffect, useRef, useState} from "react";
import {over} from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import {AuthContext} from "../Contexts.jsx";


const LiveChat = () => {
    const currentUser = useContext(AuthContext);
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem("chatMessages");
        return savedMessages ? JSON.parse(savedMessages) : [];
    });    const [userData, setUserData] = useState({
        username: currentUser.username,
        message: "",
        connected: false,
    });
    const stompClient = useRef(null);
    const hasRegistered = useRef(false);

    const registerUser = () => {
        connect();
    };
    useEffect(() => {
        if (!hasRegistered.current) {
            hasRegistered.current = true;
            registerUser();
        }

    }, []);

    const connect = () => {
        console.log("Attempting to connect to Live...");

        let sock = new SockJS("https://reci-pa-ispeci-2-v32w.onrender.com/ms");

        stompClient.current = over(sock);

        stompClient.current.connect({}, onConnected, onError)
    };


    const onConnected = () => {

        console.log("connected");
        setUserData({ ...userData, connected: true });

        stompClient.current.subscribe("/chatroom/public", onMessageReceived);
    };

    const onError = (error) => {
        console.error("WebSocket connection error:", error);
    };

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);

        setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, payloadData];
            localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
            return updatedMessages;
        });
    };

    const handleMessageInput = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, message: value });
    };

    const sendPublicMessage = () => {
        if (stompClient.current){
            let chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE",
            };

            stompClient.current.send( "/api/app/message", {}, JSON.stringify(chatMessage));

            setUserData({ ...userData, message: "" });
        }

    };
    return (
        <div className="chat-content">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.senderName === userData.username ? 'user' : 'ai'}`}
                    >
                        {msg.senderName !== userData.username && (
                            <strong>{msg.senderName}: </strong>
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


