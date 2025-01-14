import {useContext, useEffect, useRef, useState} from "react";
import SockJS from "sockjs-client";
import { Client } from '@stomp/stompjs';
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

        let sock = new SockJS("https://reci-pa-ispeci-2-v32w.onrender.com/api/ms");
        const stompClientRef = new Client({
            webSocketFactory: () => sock,
            reconnectDelay: 5000,
            debug: (str) => {
                console.log(str);
            },
            onConnect: () => {
                console.log("Connected to Live Chat");
                setUserData({ ...userData, connected: true });
                stompClientRef.subscribe("/chatroom/public", onMessageReceived);
            },
            onStompError: (frame) => {
                console.error(frame);
            }
        })
        stompClientRef.activate();
        stompClient.current = stompClientRef;
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
        const client = stompClient.current;
        if (client && client.connected){
            let chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE",
            };

            client.send( "/api/app/message", {}, JSON.stringify(chatMessage));

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


