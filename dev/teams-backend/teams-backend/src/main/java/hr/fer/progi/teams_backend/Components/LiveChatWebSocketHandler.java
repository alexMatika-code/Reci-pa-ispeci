package hr.fer.progi.teams_backend.Components;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class LiveChatWebSocketHandler extends TextWebSocketHandler {

    // Store all active WebSocket sessions
    private final ConcurrentHashMap<WebSocketSession, String> activeSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        URI uri = session.getUri();
        if (uri != null) {
            String username = UriComponentsBuilder.fromUri(uri).build().getQueryParams().getFirst("username");
            if (username != null) {
                activeSessions.put(session, username);
                System.out.println("User connected: " + username);
            } else {
                activeSessions.put(session, "Anonymous");
            }
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        String sender = activeSessions.get(session);
        String userMessage = message.getPayload();

        String jsonResponse = String.format("{\"sender\": \"%s\", \"content\": \"%s\"}", sender, userMessage);

        for (WebSocketSession s : activeSessions.keySet()) {
            if (s.isOpen()) {
                s.sendMessage(new TextMessage(jsonResponse));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        // Remove the session from the active sessions map
        activeSessions.remove(session);
        System.out.println("Connection closed. Total connections: " + activeSessions.size());
    }
}
