package hr.fer.progi.teams_backend.config;

import hr.fer.progi.teams_backend.rest.AiChatWebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class AiChatWebSocketConfig implements WebSocketConfigurer {

    private final AiChatWebSocketHandler aiChatWebSocketHandler;

    public AiChatWebSocketConfig(AiChatWebSocketHandler aiChatWebSocketHandler) {
        this.aiChatWebSocketHandler = aiChatWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(aiChatWebSocketHandler, "/aichat").setAllowedOrigins("https://reci-pa-ispeci.onrender.com");
    }
}
