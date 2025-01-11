import React, { useContext, useEffect, useState } from 'react';
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { AuthContext } from "../Contexts.jsx";

const LiveChat = () => {
    const [messages, setMessages] = useState([]);
    const [userData, setUserData] = useState({
        username: useContext(AuthContext).username,
        message: "",
        connected: false,
    });
    let stompClient = null;

    useEffect(() => {
        const connect = () => {
            const sock = new SockJS("https://reci-pa-ispeci.onrender.com/api/message");
            stompClient = over(sock);

            stompClient.connect({}, onConnected, onError);
        };

        connect();

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    const onConnected = () => {
        setUserData((prevState) => ({ ...prevState, connected: true }));

        // Subscribe to public chatroom
        stompClient.subscribe("/chatroom/public", onMessageReceived);

        userJoin();
    };

    const onError = (error) => {
        console.error("Connection error:", error);
    };

    const onMessageReceived = (data) => {
        const payloadData = JSON.parse(data.body);
        setMessages((prevMessages) => [...prevMessages, payloadData]);
    };

    const userJoin = () => {
        const chatMessage = {
            senderName: userData.username,
            status: "JOIN",
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    };

    const sendPublicMessage = (event) => {
        event.preventDefault();
        if (stompClient && userData.message.trim()) {
            const chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE",
            };
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: "" });
        }
    };

    const handleMessageInput = (event) => {
        setUserData({ ...userData, message: event.target.value });
    };

    return (
        <div className="chat-content">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.senderName}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <form onSubmit={sendPublicMessage} className="chat-input">
                <input
                    type="text"
                    value={userData.message}
                    onChange={handleMessageInput}
                    placeholder="Unesite poruku..."
                />
                <button type="submit">Pošalji</button>
            </form>
        </div>
    );
};

export default LiveChat;
