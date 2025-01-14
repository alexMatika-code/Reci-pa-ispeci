package hr.fer.progi.teams_backend.service;

import java.io.IOException;

public interface OpenAiService {
    String getChatbotResponse(String userMessage) throws IOException;
}
