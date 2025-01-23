package hr.fer.progi.teams_backend.utils;

import hr.fer.progi.teams_backend.service.OpenAiService;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.TextMessage;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AiChatWebSocketHandler extends TextWebSocketHandler {

    private final OpenAiService openAiService;

    public AiChatWebSocketHandler(OpenAiService openAiService) {
        this.openAiService = openAiService;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        String userMessage = message.getPayload();
        String aiResponse = openAiService.getChatbotResponse(userMessage);
        session.sendMessage(new TextMessage(aiResponse));
    }
}

