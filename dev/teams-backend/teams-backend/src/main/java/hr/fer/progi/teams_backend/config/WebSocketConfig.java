package hr.fer.progi.teams_backend.config;

import hr.fer.progi.teams_backend.utils.LiveChatWebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final LiveChatWebSocketHandler liveChatWebSocketHandler;

    public WebSocketConfig(LiveChatWebSocketHandler liveChatWebSocketHandler) {
        this.liveChatWebSocketHandler = liveChatWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(liveChatWebSocketHandler, "/ms").setAllowedOrigins("https://reci-pa-ispeci.onrender.com");
    }
}

