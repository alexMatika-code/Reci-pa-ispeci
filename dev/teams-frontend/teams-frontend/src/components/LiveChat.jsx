import {useContext, useEffect, useRef, useState} from "react";
import { overWS } from "stompjs";
import SockJS from "sockjs-client";
import {AuthContext} from "../Contexts.jsx";


const LiveChat = () => {
    const [messages, setMessages] = useState([]);
    const [userData, setUserData] = useState({
        username: useContext(AuthContext).username,
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

        let sock = new SockJS("https://reci-pa-ispeci-2-v32w.onrender.com/api/ms");

        stompClient.current = overWS(sock);

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
        messages.push(payloadData);
        setMessages([...messages])
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

            stompClient.current.send( "/app/message", {}, JSON.stringify(chatMessage));

            setUserData({ ...userData, message: "" });
        }

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
            <input
                type="text"
                value={userData.message}
                onChange={handleMessageInput}
                placeholder="Unesite poruku..."
            />
            <button onClick={sendPublicMessage}>Pošalji</button>
        </div>
    );
}

export default LiveChat;


